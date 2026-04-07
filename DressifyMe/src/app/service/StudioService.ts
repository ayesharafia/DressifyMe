import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  materialOption: string;
  materialDesignImage: string | null;
  patternOption: string | null;
  size: string;
}

@Injectable({ providedIn: 'root' })
export class StudioService {
  private apiUrl = 'https://your-aws-api-gateway-url.com/api/orders';

  // Current selections
  selectedMaterialOption: string = '';
  selectedMaterialDesignImage: string | null = null;
  selectedPatternOption: string | null = null;
  selectedSize: string = '';

  // Cart
  cartItems: OrderItem[] = [];

  constructor(private http: HttpClient) {}

  addToCart() {
    const item: OrderItem = {
      materialOption: this.selectedMaterialOption,
      materialDesignImage: this.selectedMaterialDesignImage,
      patternOption: this.selectedPatternOption,
      size: this.selectedSize,
    };
    this.cartItems.push(item);

    // Reset selections after adding
    this.selectedMaterialOption = '';
    this.selectedMaterialDesignImage = null;
    this.selectedPatternOption = null;
    this.selectedSize = '';
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  submitOrder(): Observable<any> {
    return this.http.post(this.apiUrl, { items: this.cartItems });
  }
  clearCart(): void {
  this.cartItems = [];
}
}