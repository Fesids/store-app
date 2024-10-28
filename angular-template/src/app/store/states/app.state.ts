import { ActionReducerMap } from '@ngrx/store';

import { AuthState, initialAuthState } from "../states/auth.state";

export interface AppState {
    auth: AuthState
}

export const initialAppState: AppState = {
    auth: initialAuthState
}

export const getInitialState = (): AppState => {
    return initialAppState;
}