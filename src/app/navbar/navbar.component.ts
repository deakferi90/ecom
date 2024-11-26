import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  imagePath: string = 'assets/images/imageAvatar.png';
  activeLink: string = '';
  cartShown: boolean = false;
  collection: any = null;
  quantity!: number | any;
  @Input() sidenavOpen: boolean = false;
  @Output() sidenavToggle: EventEmitter<boolean> = new EventEmitter();

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
    this.sidenavToggle.emit(this.sidenavOpen);
  }

  constructor(private cartService: CartService) {}

  links = [
    { path: '/', label: 'Collections' },
    { path: '/men', label: 'Men' },
    { path: '/women', label: 'Women' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  @ViewChild('pol') pol!: ElementRef;

  ngOnInit() {
    this.cartService.getCartQuantity().subscribe((quantity) => {
      this.quantity = quantity;
    });
    if (typeof window !== 'undefined') {
      const storedActiveLink = localStorage.getItem('activeLink');
      this.activeLink = storedActiveLink
        ? storedActiveLink
        : this.links[0].path;
    } else {
      console.warn('localStorage is not available in the current environment.');
    }
  }
  makeActive(path: string) {
    this.activeLink = path;
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeLink', path);
    }
  }

  navigateAndCloseSidenav() {
    this.sidenavOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const cartBox = document.querySelector('.cart-box');
    const cartButton = document.querySelector('.cart');

    if (
      cartBox &&
      !cartBox.contains(event.target as Node) &&
      cartButton &&
      !cartButton.contains(event.target as Node)
    ) {
      this.cartShown = false;
    }
  }

  toggleCart(): void {
    const cart = document.querySelector('.cart-box');
    this.cartShown = !this.cartShown;
    if (typeof window !== 'undefined') {
      const savedCollection = localStorage.getItem('collection');
      const savedQuantity = localStorage.getItem('quantity');
      if (savedCollection && savedQuantity) {
        this.collection = JSON.parse(savedCollection);
        this.quantity = JSON.parse(savedQuantity);
      } else {
        console.log('No collection found in localStorage.');
      }
    }
    if (cart) {
      if (this.cartShown) {
        cart.classList.remove('hide');
      } else {
        cart.classList.add('hide');
      }
    }
  }

  clearCart() {
    this.cartService.resetCartQuantity();
    this.quantity = null;
  }
}
