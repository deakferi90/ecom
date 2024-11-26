import { CommonModule } from '@angular/common';
import { CollectionsService } from './collections.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit {
  quantity: number = 1;
  collection: any = {};
  mainImage: string = 'assets/image-product-1.jpg';
  modalImage: string = '';
  isModalOpen: boolean = false;
  collected = [
    { id: 1, name: 'assets/image-product-1.jpg' },
    { id: 2, name: 'assets/image-product-2.jpg' },
    { id: 3, name: 'assets/image-product-3.jpg' },
    { id: 4, name: 'assets/image-product-4.jpg' },
  ];
  @Output() quntity = new EventEmitter<any>();
  constructor(
    private collectionsService: CollectionsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionsService.getCollections().subscribe((collection) => {
      this.collection = collection;
    });
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  changeImagePath(mainImage: string) {
    this.mainImage = mainImage;
  }

  onModalContentClick(event: Event) {
    event.stopPropagation();
    console.log('Clicked inside modal content. Modal remains open.');
  }

  currentImageIndex: number = 0;
  currentImage: string = this.collected[this.currentImageIndex].name;

  getPreviousImage(): string {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.collected.length) %
      this.collected.length;
    return this.collected[this.currentImageIndex].name;
  }

  getNextImage(): string {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.collected.length;
    return this.collected[this.currentImageIndex].name;
  }

  switchImage(direction: 'previous' | 'next', event: Event): void {
    event.stopPropagation();
    if (direction === 'previous') {
      this.modalImage = this.getPreviousImage();
    } else if (direction === 'next') {
      this.modalImage = this.getNextImage();
    }
  }

  openModal(imagePath: string): void {
    this.modalImage = imagePath;
    this.currentImageIndex = this.collected.findIndex(
      (item) => item.name === imagePath
    );
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addDataToCart() {
    const savedCollection = localStorage.getItem('collection');
    const savedQuantity = localStorage.getItem('quantity');
    if (savedCollection && savedQuantity) {
      this.collection = JSON.parse(savedCollection);
      this.quantity = JSON.parse(savedQuantity);
    } else {
      console.log('No collection found in localStorage.');
    }
  }

  slideToLeft() {
    console.log('I clicked on the left button');
  }

  slideToRight(e: any) {
    e.preventDefault();
    console.log('I clicked on the right button');
  }

  addToCart() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('collection', JSON.stringify(this.collection));
        localStorage.setItem('quantity', JSON.stringify(this.quantity));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    } else {
      console.warn('localStorage is not available in the current environment.');
    }
    this.cartService.incrementCartQuantity(this.quantity);
  }
}
