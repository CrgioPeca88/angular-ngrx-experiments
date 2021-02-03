// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

// Assets
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/components/app/app.component';
import { CounterComponent } from '@counter/components/counter/counter.component';
import { reducers, metaReducers } from '@core/reducers.config';
import { counterReducer } from '@counter/counter.reducers';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ counter: counterReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
