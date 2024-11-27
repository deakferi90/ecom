import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce';
  imagePath: string = './assets/images/logo.svg';
  sidenavOpen: boolean = false;

  toggleSidenav(isOpen: boolean): void {
    this.sidenavOpen = isOpen;
  }
}
