// Dependencies
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// Assets
import { counterReducer } from '@counter/counter.reducers';
import { environment } from '@environments/environment';

const counterR: ActionReducerMap<any> = { counter: counterReducer };

function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any): any {
    console.log(`%c State ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, state);
    console.log(`%c Action ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, action);
    return reducer(state, action);
  }
}

const metaReducers: MetaReducer<any>[] = !environment.production ? [logger, storeFreeze] : [];

export const NGRX_CONFIG = [
  StoreModule.forRoot(counterR, { metaReducers }),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    name: 'AngularChatNgRx',
    logOnly: environment.production,
    maxAge: 25
  })
];
