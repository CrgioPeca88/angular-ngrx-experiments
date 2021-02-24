// Dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Assets
import { CounterComponent } from '@counter/components/counter/counter.component';
import { CounterRoutingModule } from './counter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CounterRoutingModule
  ],
  declarations: [
    CounterComponent
  ]
})
export class CounterModule { }
