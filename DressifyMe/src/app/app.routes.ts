import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Studio } from './studio/studio'
import { Bag } from './bag/bag';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'studio', component: Studio },
  { path: 'bag', component: Bag },
  { path: '', component: Home },

];
