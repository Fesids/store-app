import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType, } from '@ngrx/effects'
import { Action, createAction, Store } from '@ngrx/store';

import { AuthService } from "../../services/auth.service";
import * as AuthActions from '../actions/auth.action';
import { catchError, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { SuccessResponse } from "../../models/successResponse";
import { AuthResponse, CreateUserData, LoggedUser, LoginUserData } from "../../models/auth.model";
import { ApiService } from "../../http/api.service";
import {loadUserSuccess, loadUserFailure, loadUser} from "../actions/auth.action"


export const initAuth = createAction('[Auth] Init');


export const authEffects = {
  initAuth$: createEffect(
    (actions$ = inject(Actions)) => actions$.pipe(
      ofType(initAuth),
      switchMap(() => of(loadUser()))
    ),
    { functional: true }
  ),
  
  loadUser$: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => actions$.pipe(
      ofType(loadUser),
      mergeMap(() => authService.getUserInfo().pipe(
        map(response => response.status === '200' && response.data 
          ? loadUserSuccess({ user: response.data })
          : loadUserFailure({ error: 'Invalid response' })
        ),
        catchError(error => of(loadUserFailure({ error })))
      ))
    ),
    { functional: true }
  )
};