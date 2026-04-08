import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private db: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const firebaseConfig = (environment as any).firebase;
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      this.db = getFirestore(app);
    }
  }

  async saveOrder(orderData: any): Promise<string> {
    if (!this.db) {
      console.warn('Firebase not available on server');
      return '';
    }

    try {
      const ordersRef = collection(this.db, 'orders');

      const docRef = await addDoc(ordersRef, {
        ...orderData,
        createdAt: Timestamp.now(),
        status: 'pending'
      });

      console.log('Order saved! ID:', docRef.id);
      return docRef.id;

    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  }
}