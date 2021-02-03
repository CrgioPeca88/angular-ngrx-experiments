// Dependencies
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

// Assets
import { environment } from '@environments/environment';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
