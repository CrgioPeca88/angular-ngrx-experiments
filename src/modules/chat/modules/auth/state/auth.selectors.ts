// Dependencies
import { createSelector, createFeatureSelector } from '@ngrx/store';

// Assets
import * as authReducer from './auth.reducer'

export const authStateReference = createFeatureSelector<authReducer.State>('auth');
export const getAuthState = createSelector(authStateReference, authReducer.getAuthState);
export const getAuthError = createSelector(authStateReference, authReducer.getAuthError);
export const getAuthIsLoading = createSelector(authStateReference, authReducer.getAuthIsLoading);
