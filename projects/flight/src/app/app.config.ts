import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { BookingStore } from './booking/logic-flight';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing()
    ),
    provideHttpClient()
  ]
};
