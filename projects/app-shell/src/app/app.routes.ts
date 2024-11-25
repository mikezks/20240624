import { Routes } from '@angular/router';
import { HomeComponent } from './shared/feature-core';
import { IframeWrapperComponent } from './shared/ui-common';


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
    component: IframeWrapperComponent,
    data: {
      url: 'http://localhost:4200/booking/flight/search'
    }
  },
  {
    path: 'checkin',
    component: IframeWrapperComponent,
    data: {
      url: 'http://localhost:4200/checkin/passenger/search'
    }
  },
  {
    path: 'boarding',
    component: IframeWrapperComponent,
    data: {
      url: 'http://localhost:4200/boarding/departures'
    }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
