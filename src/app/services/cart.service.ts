import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartQuantity = new BehaviorSubject<number>(0);

  constructor() {
    // Load initial value from localStorage if it exists (only in browser)
    const initialQuantity = this.getLocalStorageItem('quantity') || 0;
    this.cartQuantity.next(initialQuantity);
  }

  getCartQuantity() {
    return this.cartQuantity.asObservable();
  }

  updateCartQuantity(newQuantity: number) {
    this.setLocalStorageItem('quantity', newQuantity);
    this.cartQuantity.next(newQuantity);
  }

  incrementCartQuantity(additionalQuantity: number) {
    this.updateCartQuantity(additionalQuantity);
  }

  // Helper function to safely access localStorage
  private getLocalStorageItem(key: string): number | null {
    if (this.isBrowser()) {
      const item = localStorage.getItem(key);
      return item ? parseInt(item, 10) : null;
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: number) {
    if (this.isBrowser()) {
      localStorage.setItem(key, value.toString());
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}