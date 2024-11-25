import { Routes } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  {
    path: 'men',
    component: MenComponent,
  },
  {
    path: 'women',
    component: WomenComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '',
    component: CollectionsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];
