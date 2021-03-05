// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// Assets
import { environment } from '@environments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { counterReducer } from '@counter/counter.reducers';

const counterR: ActionReducerMap<any> = { counter: counterReducer };

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any): any {
    console.log(`%c State ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, state);
    console.log(`%c Action ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger, storeFreeze] : [];

const NGRX_IMPORTS = [
  StoreModule.forRoot(counterR, { metaReducers }),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    name: 'AngularChatNgRx',
    logOnly: environment.production,
    maxAge: 25
  })
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ...NGRX_IMPORTS
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
