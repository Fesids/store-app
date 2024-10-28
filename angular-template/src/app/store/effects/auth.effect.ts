import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType, } from '@ngrx/effects'
import { Store } from '@ngrx/store';

import { AuthService } from "../../services/auth.service";
import * as AuthActions from '../actions/auth.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { LoggedUser } from "../models/auth.model";
import { error } from "console";


/*@Injectable({
    providedIn: 'root'
})
export class AuthEffect {

    constructor(private action$: Actions, private authService: AuthService, private store: Store ){}

    fetchUser = createEffect(() => 
        this.action$.pipe(
           ofType(AuthActions.loginUser),
           mergeMap(action => 
                this.authService.loginUser(action.loginData)
                .pipe(
                    map((data: SuccessResponse<LoggedUser>) => AuthActions.fetchUserSuccess({payload: data})),
                    catchError((err) => of({type: '[User] Fetch User Failed', error: err}))
                )

           )
        )
    )

    createUser = createEffect(() => 
        this.action$.pipe(
            ofType(AuthActions.sigInUser),
            mergeMap(action => 
                this.authService.signupUser(action.createData)
                .pipe(
                    map((data: SuccessResponse<any>) => AuthActions.createUserSuccess({payload: data})),
                    catchError((err) => of(AuthActions.createUserFailure({error: err})))
                )
            )
        )
    )

}*/

@Injectable({
    providedIn: 'root',
  })
  export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private store: Store) {}
  
    fetchUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginUser),
        mergeMap(action =>
          this.authService.loginUser(action.loginData).pipe(
            map((response: SuccessResponse<LoggedUser>) =>
              AuthActions.fetchUserSuccess({ payload: response })
            ),
            catchError(error => of(AuthActions.fetchUserFailure({ error })))
          )
        )
      )
    );
  
    
    createUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.signUpUser),
        mergeMap(action =>
          this.authService.signupUser(action.createData).pipe(
            map((response: SuccessResponse<any>) =>
              AuthActions.createUserSuccess({ payload: response })
            ),
            catchError(error => of(AuthActions.createUserFailure({ error })))
          )
        )
      )
    );
  }