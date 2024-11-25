import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideConfigState } from '@flight-workspace/config-lib';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(
      withFetch()
    ),
    provideConfigState('./config.state.json'),
    provideClientHydration(
      withIncrementalHydration()
    )
  ]
};
