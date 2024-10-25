import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectToken = createSelector(
    selectAuthState,
    (state) => state.token
)

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state) => state.loading
)

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
)







