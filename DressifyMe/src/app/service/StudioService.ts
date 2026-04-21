import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  materialOption: string;
  materialDesign: string;
  materialDesignImage: string | null;
  patternOption: string | null;
  patternImage: string | null;
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
  selectedPatternImage: string | null = null; // 👈 add
  selectedMaterialDesign: string = '';        // 👈 add


  // Cart
  cartItems: OrderItem[] = [];

  constructor(private http: HttpClient) {}

  addToCart() {
    const item: OrderItem = {
      materialOption:      this.selectedMaterialOption,
    materialDesign:      this.selectedMaterialDesign,       // ← must be here
    materialDesignImage: this.selectedMaterialDesignImage,
    patternOption:       this.selectedPatternOption,
    patternImage:        this.selectedPatternImage,         // ← must be here
    size:                this.selectedSize,
    };
    this.cartItems.push(item);

    // Reset selections after adding
    this.selectedMaterialOption = '';
    this.selectedMaterialDesign = '';
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