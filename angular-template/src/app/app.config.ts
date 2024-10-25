import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { reducers, metaReducers } from './store/reducers';
import { AuthEffects } from './store/effects/auth.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(reducers, {metaReducers}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([ AuthEffects])
  ]
};
