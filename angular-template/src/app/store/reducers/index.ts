import { isDevMode } from '@angular/core'
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { AppState } from '../states/app.state'

export const reducers: ActionReducerMap<AppState>  = {
    auth: authReducer
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode()? [] : []