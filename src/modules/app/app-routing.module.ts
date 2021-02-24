// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'ngrx-counter',
  loadChildren: () => import('@counter/counter.module').then(modules => modules.CounterModule)
}, {
  path: 'rxjs-examples',
  loadChildren: () => import('@rxjs-exam/rxjs-examples.module').then(modules => modules.RxjsExamplesModule)
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'prefix'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
