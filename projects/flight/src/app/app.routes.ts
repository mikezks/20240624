import { Routes } from '@angular/router';
import { HomeComponent } from './shared/feature-core';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking')
  },
  {
    path: 'boarding',
    loadChildren: () => import('./boarding')
  },
  {
    path: 'checkin',
    loadChildren: () => import('./checkin/checkin.routes')
  },
  {
    path: 'luggage',
    loadChildren: () => import('./luggage/luggage.routes')
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
