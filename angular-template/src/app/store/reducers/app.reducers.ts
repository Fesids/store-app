import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { authReducer } from './auth.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
    auth: authReducer
}