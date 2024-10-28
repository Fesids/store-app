import { Action, createReducer, on}  from '@ngrx/store';
import { initialAuthState } from '../states/auth.state';
import * as AuthActions from '../actions/auth.action'

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loginUser, AuthActions.signUpUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.fetchUserSuccess, AuthActions.createUserSuccess, (state, {payload}) => (
        {
            ...state,
            user: payload.data,
            token: payload.data?.token || null,
            loading: false
        }
    )),

    on(AuthActions.fetchUserFailure, AuthActions.createUserFailure, (state, {error}) => (
        {
            ...state,
            loading: false,
            error,
        }
    ))
)