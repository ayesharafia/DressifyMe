import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudioService } from '../../app/service/StudioService';
import { Router } from '@angular/router';
import { OrderService } from '../../app/service/order.service';

export interface CustomerDetails {
  name: string;
  email: string;
  contact: string;
  address: string;
}

@Component({
  standalone: true,
  selector: 'app-bag',
  imports: [CommonModule, FormsModule],
  templateUrl: './bag.html',
  styleUrls: ['./bag.css'],
})
export class Bag {
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  showModal = false;
  formSubmitted = false;

  customerDetails: CustomerDetails = this.emptyCustomer();

  readonly gpayId = 'yourname@upi';
  readonly paymentWhatsApp = '918485825939';

  // ── Pricing Table ─────────────────────────────────────────────────────────
  readonly pricingTable: Record<string, Record<string, number>> = {
    'Kurti':       { XS: 875,  S: 905,  M: 935,  L: 965,  XL: 995,  XXL: 1025 },
    'Close Kurti': { XS: 890,  S: 935,  M: 1135, L: 980,  XL: 1010, XXL: 1040 },
    'Kaftan':      { XS: 1025, S: 1070, M: 1270, L: 1145, XL: 1190, XXL: 1235 },
    'Frock':       { XS: 975,  S: 1020, M: 1050, L: 1080, XL: 1125, XXL: 1170 },
    'Gown':        { XS: 1350, S: 1825, M: 1900, L: 1975, XL: 2050, XXL: 2125 },
    'CordSet':     { XS: 1240, S: 1300, M: 1360, L: 1420, XL: 1480, XXL: 1540 },
  };

  getItemPrice(item: any): number {
    const pattern = item.patternOption;
    const size    = item.size;
    return this.pricingTable[pattern]?.[size] ?? 0;
  }

  getTotalPrice(): number {
    return this.studio.cartItems.reduce(
      (sum, item) => sum + this.getItemPrice(item), 0
    );
  }

  constructor(
    public studio: StudioService,
    private router: Router,
    private orderService: OrderService
  ) {}

  removeItem(index: number): void {
    this.studio.removeFromCart(index);
    this.successMessage = '';
    this.errorMessage = '';
  }

  openOrderModal(): void {
    if (this.studio.cartItems.length === 0) {
      this.errorMessage = 'Your bag is empty!';
      return;
    }
    this.showModal = true;
    this.formSubmitted = false;
    this.customerDetails = this.emptyCustomer();
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.formSubmitted = false;
  }

  closeModalOnBackdrop(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  async confirmOrder(): Promise<void> {
    this.formSubmitted = true;

    if (!this.isFormValid()) return;

    try {
      // ✅ Save from cartItems, not from already-reset service fields
      await this.orderService.saveOrder({
        name:       this.customerDetails.name,
        email:      this.customerDetails.email,
        contact:    this.customerDetails.contact,
        address:    this.customerDetails.address,
        totalPrice: this.getTotalPrice(),
        items:      this.studio.cartItems.map(item => ({
          materialOption:      item.materialOption,
          materialDesign:      item.materialDesign,
          materialDesignImage: item.materialDesignImage,
          patternOption:       item.patternOption,
          patternImage:        item.patternImage,
          size:                item.size,
          price:               this.getItemPrice(item),
        })),
      });
    } catch (error) {
      console.error('Failed to save order:', error);
    }

    const name            = this.customerDetails.name;
    const itemCount       = this.studio.cartItems.length;
    const total           = this.getTotalPrice();
    const gpayId          = this.gpayId;
    const paymentWhatsApp = this.paymentWhatsApp;

    this.closeModal();

    setTimeout(() => {
      alert(
        `✅ Order Placed Successfully!\n\n` +
        `Thank you, ${name}! 🎉\n` +
        `Your order of ${itemCount} item(s) has been placed.\n` +
        `Total Amount: ₹${total}\n` +
        `It will arrive in approximately 15 days.\n\n` +
        `💳 Please GPay to: ${gpayId}\n` +
        `📸 Send screenshot on WhatsApp: +${paymentWhatsApp}`
      );

      this.studio.clearCart();

      this.router.navigate(['/home'], {
        queryParams: { orderSuccess: 'true' }
      });
    }, 150);
  }

  isFormValid(): boolean {
    const { name, email, contact, address } = this.customerDetails;
    return (
      !!name &&
      this.isValidEmail(email) &&
      !!contact &&
      !!address
    );
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidContact(contact: string): boolean {
    return /^\d{10}$/.test(contact);
  }

  private emptyCustomer(): CustomerDetails {
    return { name: '', email: '', contact: '', address: '' };
  }
}