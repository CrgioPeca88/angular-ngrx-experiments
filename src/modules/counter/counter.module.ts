// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

// Assets
import { CounterComponent } from '@counter/components/counter/counter.component';
import { counterReducer } from '@counter/counter.reducers';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ counter: counterReducer})
  ],
  declarations: [
    CounterComponent
  ],
  exports: [
    CounterComponent
  ],
  providers: []
})
export class CounterModule { }
