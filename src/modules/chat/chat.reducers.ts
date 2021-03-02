// Dependencies
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

//Assets
import { RouterStateUrl } from '@core/utils';
import * as fromAuth from '@chat/modules/auth/reducers/auth.reducer'

export interface State {
  auth: fromAuth.State,
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State|any> = {
  auth: fromAuth.AuthReducer,
  router: fromRouter.routerReducer
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log(`%c State ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, state);
    console.log(`%c Action ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

export const authStateReference = createFeatureSelector<fromAuth.State>('auth');
export const getAuthState = createSelector(authStateReference, fromAuth.getAuthState);
export const getAuthError = createSelector(authStateReference, fromAuth.getAuthError);
export const getAuthIsLoading = createSelector(authStateReference, fromAuth.getAuthIsLoading);
