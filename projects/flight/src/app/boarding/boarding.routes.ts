import { Routes } from '@angular/router';
import { FlightDepartureComponent } from './feature-departure';

export const BOARDING_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'departure',
        pathMatch: 'full'
      },
      {
        path: 'departure',
        component: FlightDepartureComponent
      }
    ]
  }
];

export default BOARDING_ROUTES;
