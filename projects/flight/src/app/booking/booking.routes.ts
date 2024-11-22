import { Routes } from "@angular/router";
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from "./feature-flight";
import { flightsResolverConfig } from "./logic-flight/data-access/flight.resolver";
import { DepatureComponent } from "../boarding/feature-departure/flight-departure/departure.component";
import { MyFlightsComponent } from "./feature-flight/my-flights/my-flights.component";
import { provideNavigationConfig } from "@flight-workspace/navigation";
import { BOOKING_NAVIGATION } from "./booking.navigation";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideNavigationConfig(BOOKING_NAVIGATION)
    ],
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
          },
          {
            path: 'departures',
            component: DepatureComponent
          }
        ]
      },
      {
        path: 'my-flights',
        component: MyFlightsComponent,
      }
    ]
  }
];

export default BOOKING_ROUTES;
