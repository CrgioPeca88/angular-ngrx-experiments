// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Assets
import { environment } from '@environments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { counterReducer } from '@counter/counter.reducers';
import { reducers, metaReducers, State } from '@chat/chat.reducers';

const counterR = { counter: counterReducer };
const resultReducers: ActionReducerMap<State|any> = { ...counterR, ...reducers };
const NGRX_IMPORTS = [
  StoreModule.forRoot(resultReducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    name: 'AngularChatNgRx',
    logOnly: environment.production
  })
];

@NgModule({
  imports: [
    BrowserModule,
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
