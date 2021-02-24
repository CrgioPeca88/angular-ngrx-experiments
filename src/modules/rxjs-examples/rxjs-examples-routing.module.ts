// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assets
import { RxjsExComponent } from './components/rxjs-exam/rxjs-exam.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: RxjsExComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsExamplesRoutingModule { }
