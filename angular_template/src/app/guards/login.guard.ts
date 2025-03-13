
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const loginGuard: CanActivateFn = () => {
    const router = inject(Router);
    return inject(AuthService).getUserInfo().pipe(
      map(() => {
        router.navigate(['/']);
        return false;
      }),
      catchError(() => of(true))
    );
  };