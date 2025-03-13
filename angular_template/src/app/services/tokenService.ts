
/*import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { loadUser } from '../store/actions/auth.action';
import { AuthResponse } from '../models/auth.model';


@Injectable({ providedIn: 'root' })
export class TokenService {
  private cookieService = inject(CookieService);
  private store = inject(Store);

  clearAuthCookies() {
    this.cookieService.delete('auth_cookie');
    //this.cookieService.delete('auth_cookie_expiration');
  }


  isAuthenticated(): boolean {
    const token = this.cookieService.get('auth_cookie');
    
    
    
    if (!token) return false;
    
    return new Date(expiration) > new Date();
  }

  initialize() {
    if (this.isAuthenticated()) {
      this.store.dispatch(loadUser());
    }
  }

  handleLogin(response: AuthResponse) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    
    this.cookieService.set('auth_cookie', response.token, {
      expires: expirationDate,
      secure: true,
      sameSite: 'Strict'
    });
    
    this.cookieService.set('auth_cookie_exp', expirationDate.toISOString(), {
      expires: expirationDate,
      secure: true,
      sameSite: 'Strict'
    });
    
    this.store.dispatch(loadUser());
  }

  logout() {
    this.cookieService.deleteAll('/');
    //this.store.dispatch(logoutUser());
  }
}*/

import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { loadUser } from "../store/actions/auth.action";
import { AuthResponse } from "../models/auth.model";

@Injectable({ providedIn: 'root' })
export class TokenService {
  private cookieService = inject(CookieService);
  private store = inject(Store);

  clearAuthCookies() {
    this.cookieService.delete('auth_cookie');
    //this.cookieService.delete('auth_cookie_expiration');
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('auth_cookie');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now(); 
    } catch (e) {
      return false;
    }
  }

  getTokenExpiration(): Date | null {
    const token = this.cookieService.get('auth_cookie');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000); 
    } catch (e) {
      return null;
    }
  }

  initialize() {
    if (this.isAuthenticated()) {
      this.store.dispatch(loadUser());
    }
  }

  // token.service.ts
handleLogin(authResponse: AuthResponse) {
  console.log('Handling login with token:', authResponse.token);
  const expirationDate = this.getExpirationFromToken(authResponse.token);
  
  if (!expirationDate) {
    console.error('Invalid token expiration');
    throw new Error('Invalid token expiration');
  }

  console.log('Setting cookie with expiration:', expirationDate);
  this.cookieService.set('auth_cookie', authResponse.token, {
    expires: expirationDate,
    secure: true,
    sameSite: 'Strict',
    path: '/'
  });
  
  this.store.dispatch(loadUser());
}
  private getExpirationFromToken(token: string): Date | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);  // Convert JWT exp (seconds) to milliseconds
    } catch (e) {
      return null;
    }
  }
  logout() {
    this.cookieService.delete('auth_cookie', '/');
    //this.store.dispatch(logoutUser());
  }
}