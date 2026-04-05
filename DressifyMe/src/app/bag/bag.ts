import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioService } from '../../app/service/StudioService';

@Component({
  standalone: true,
  selector: 'app-bag',
  imports: [CommonModule],
  templateUrl: './bag.html',
  styleUrls: ['./bag.css'],
})
export class Bag {
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(public studio: StudioService) {}

  removeItem(index: number) {
    this.studio.removeFromCart(index);
    this.successMessage = '';
    this.errorMessage = '';
  }

  placeOrder() {
    if (this.studio.cartItems.length === 0) {
      this.errorMessage = 'Your bag is empty!';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.studio.submitOrder().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = `Order placed successfully for ${this.studio.cartItems.length} item(s)!`;
        this.studio.cartItems = []; // clear cart after success
        console.log('Order placed:', response);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to place order. Please try again.';
        console.error('Order error:', err);
      },
    });
  }}