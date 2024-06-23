import { Routes } from "@angular/router";
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from "./feature-flight";
import { flightsResolverConfig } from "./logic-flight/data-access/flight.resolver";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: flightsResolverConfig
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
