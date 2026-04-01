import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Studio } from './studio/studio'
import { Wishlist } from './wishlist/wishlist';
import { Bag } from './bag/bag';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'studio', component: Studio },
  { path: 'wishlist', component: Wishlist },
  { path: 'bag', component: Bag }
];
