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

  // ── Modal state ─────────────────────────────────────────────────────────────
  showModal = false;
  formSubmitted = false;

  customerDetails: CustomerDetails = this.emptyCustomer();

  // ── Replace with your actual values ─────────────────────────────────────────
  readonly gpayId = 'yourname@upi';
  readonly paymentEmail = 'yourname@gmail.com';

  constructor(public studio: StudioService, private router: Router,  private orderService: OrderService) {}

  // ── Cart ────────────────────────────────────────────────────────────────────

  removeItem(index: number): void {
    this.studio.removeFromCart(index);
    this.successMessage = '';
    this.errorMessage = '';
  }

  // ── Modal ───────────────────────────────────────────────────────────────────

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

  // ── Confirm Order ────────────────────────────────────────────────────────────
async confirmOrder(): Promise<void> {
  this.formSubmitted = true;

  if (!this.isFormValid()) return;

  try {
    await this.orderService.saveOrder({
      name:                        this.customerDetails.name,
      email:                       this.customerDetails.email,
      contact:                     this.customerDetails.contact,
      address:                     this.customerDetails.address,
      selectedMaterialOption:      this.studio.selectedMaterialOption,
      selectedMaterialDesign:      this.studio.selectedMaterialDesign,
      selectedMaterialDesignImage: this.studio.selectedMaterialDesignImage,
      selectedPatternOption:       this.studio.selectedPatternOption,
      selectedPatternImage:        this.studio.selectedPatternImage,
    });
  } catch (error) {
    console.error('Failed to save order:', error);
  }

  const name         = this.customerDetails.name;
  const itemCount    = this.studio.cartItems.length;
  const gpayId       = this.gpayId;
  const paymentEmail = this.paymentEmail;

  this.closeModal();

  setTimeout(() => {
    alert(
      `✅ Order Placed Successfully!\n\n` +
      `Thank you, ${name}! 🎉\n` +
      `Your order of ${itemCount} item(s) has been placed.\n` +
      `It will arrive in approximately 1 month.\n\n` +
      `💳 Please GPay to: ${gpayId}\n` +
      `📸 Send screenshot to: ${paymentEmail}`
    );

    this.studio.clearCart();

    this.router.navigate(['/home'], {
      queryParams: { orderSuccess: 'true' }
    });
  }, 150);
}

  // ── Validation ──────────────────────────────────────────────────────────────

  isFormValid(): boolean {
    const { name, email, contact, address } = this.customerDetails;
    return (
      !!name &&
      this.isValidEmail(email) &&
      this.isValidContact(contact) &&
      !!address
    );
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidContact(contact: string): boolean {
    return /^\d{10}$/.test(contact);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  private emptyCustomer(): CustomerDetails {
    return { name: '', email: '', contact: '', address: '' };
  }
}