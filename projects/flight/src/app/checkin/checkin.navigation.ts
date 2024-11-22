import { NavigationConfig } from "@flight-workspace/navigation";


export const CHECKIN_NAVIGATION: NavigationConfig = [
  {
    route: 'checkin',
    label: 'Checkin',
    icon: 'checkin',
    items: [
      {
        route: 'passenger',
        label: 'Passenger',
        icon: 'passenger'
      },
      {
        route: 'miles',
        label: 'Miles',
        icon: 'flight'
      }
    ]
  }
];
