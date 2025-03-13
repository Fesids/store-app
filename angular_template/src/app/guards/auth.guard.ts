// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    return inject(AuthService).getUserInfo().pipe(
      map(() => true),
      catchError(() => {
        router.navigate(['/login']);
        return of(false);
      })
    );
  };