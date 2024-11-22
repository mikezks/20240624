import { Routes } from "@angular/router";
import { PassengerSearchComponent } from "./feature-passenger/passenger-search/passenger-search.component";
import { MilesComponent } from "./feature-miles";
import { provideNavigationConfig } from "@flight-workspace/navigation";
import { CHECKIN_NAVIGATION } from "./checkin.navigation";

export const CHECKIN_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideNavigationConfig(CHECKIN_NAVIGATION)
    ],
    children: [
      {
        path: '',
        redirectTo: 'passenger',
        pathMatch: 'full'
      },
      {
        path: 'passenger',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: PassengerSearchComponent
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./feature-passenger/passenger-edit/passenger-edit.component')
          },
        ]
      },
      {
        path: 'miles',
        component: MilesComponent
      }
    ]
  }
];

export default CHECKIN_ROUTES;
