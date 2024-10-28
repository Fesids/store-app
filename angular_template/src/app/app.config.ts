import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { metaReducers, reducers } from './store/reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideEffects([AuthEffects]),
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore(reducers, { metaReducers}),
    
  ]
};
