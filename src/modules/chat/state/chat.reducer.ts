// Dependencies
//import { ActionReducer, MetaReducer } from '@ngrx/store';
//import { environment } from '@environments/environment';
//import { storeFreeze } from 'ngrx-store-freeze';

//Assets
//import { RouterStateUrl } from '@core/utils';
//import * as fromAuth from '@chat/modules/auth/reducers/auth.reducer'


/*export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log(`%c State ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, state);
    console.log(`%c Action ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];*/
