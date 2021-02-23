// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Assets
import { CounterComponent } from '@counter/components/counter/counter.component';

@NgModule({
  imports: [
    BrowserModule
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
