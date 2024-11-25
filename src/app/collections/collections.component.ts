import { CommonModule } from '@angular/common';
import { CollectionsService } from './collections.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';

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
  @Output() quntity = new EventEmitter<any>();
  constructor(
    private collectionsService: CollectionsService,
    private cdr: ChangeDetectorRef
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
  }
}
