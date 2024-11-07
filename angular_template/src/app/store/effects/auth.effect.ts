import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType, } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store';

import { AuthService } from "../../services/auth.service";
import * as AuthActions from '../actions/auth.action';
import { catchError, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { AuthResponse, CreateUserData, LoggedUser, LoginUserData } from "../models/auth.model";
import { ApiService } from "../../http/api.service";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  // **Login Effect**
  login$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
    
        ofType(AuthActions.loginRequested),
        mergeMap(action => 
          this.authService.loginUser(action.credentials)
          .pipe(
            map((data: any)=> AuthActions.loginSuccess({response: data}))
          )
        )
    )
  );

  // **Signup Effect**
  /*signup$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
    
      ofType(AuthActions.loginRequested),
      mergeMap(action => 
        this.authService.loginUser(action.credentials)
        .pipe(
          map((data: any)=> AuthActions.loginSuccess({response: data}))
        )
      ))
  );*/
}