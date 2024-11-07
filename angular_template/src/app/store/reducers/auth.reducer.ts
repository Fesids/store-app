import { Action, createReducer, on}  from '@ngrx/store';
import { initialAuthState } from '../states/auth.state';
import * as AuthActions from '../actions/auth.action'

/*xport const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.loginUser, AuthActions.signUpUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.fetchUserSuccess, AuthActions.SognUpSuccess, (state, {payload}) => (
        {
            ...state,
            user: payload.data?.guid,
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
)*/



export const authReducer = createReducer(
  initialAuthState,

  // **Login Handlers**
  on(AuthActions.loginRequested, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response.loggedUser,
    token: response.token,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // **Signup Handlers**
  on(AuthActions.signupRequested, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.signupSuccess, (state, { response }) => ({
    ...state,
    user: response.loggedUser,
    token: response.token,
    loading: false,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
