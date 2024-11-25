import { Routes } from '@angular/router';
import { DepatureComponent } from './flight-departure/departure.component';
import { ScanTicketComponent } from './scan-ticket/scan-ticket.component';

export const BOARDING_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'departures',
        pathMatch: 'full'
      },
      {
        path: 'departures',
        component: DepatureComponent
      },
      {
        path: 'scan-ticket',
        component: ScanTicketComponent
      }
    ]
  }
];

export default BOARDING_ROUTES;
