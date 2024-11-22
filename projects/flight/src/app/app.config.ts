import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideNavigationService } from '@flight-workspace/navigation';
import { APP_ROUTES } from './app.routes';
import { APP_NAVIGATION } from './app.navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideNavigationService(APP_NAVIGATION)
  ]
};
