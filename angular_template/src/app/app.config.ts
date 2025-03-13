import { APP_INITIALIZER, ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { metaReducers, reducers } from './store/reducers';
import { provideEffects } from '@ngrx/effects';
import { authEffects } from './store/effects/auth.effect';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthService } from './services/auth.service';
import { ApiService } from './http/api.service';
import { AppInitService } from './services/appInitService';


export const appConfig: ApplicationConfig = {
  providers: [

     
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    
    provideStore({ auth: authReducer }),
    provideEffects(authEffects),  

    
    provideRouter(routes),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    
   
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: AppInitService) => () => initService.init(),
      deps: [AppInitService],
      multi: true
    }
  ]
};