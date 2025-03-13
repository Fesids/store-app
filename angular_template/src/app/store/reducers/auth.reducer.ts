import { Action, createReducer, on}  from '@ngrx/store';
import { initialAuthState } from '../states/auth.state';
import * as AuthActions from '../actions/auth.action'
import { LoggedUserInfo } from '../../models/auth.model';
import {loadUserFailure, loadUserSuccess, loadUser} from "../actions/auth.action"


export const authReducer = createReducer(
  initialAuthState,
  on(loadUser, state => ({ ...state, loading: true, error: null })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);