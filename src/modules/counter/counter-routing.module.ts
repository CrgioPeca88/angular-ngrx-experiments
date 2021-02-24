// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assets
import { CounterComponent } from './components/counter/counter.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: CounterComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterRoutingModule { }
