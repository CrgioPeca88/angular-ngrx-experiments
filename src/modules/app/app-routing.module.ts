// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assets
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},{
  path: 'ngrx-counter',
  loadChildren: () => import('@counter/counter.module').then(modules => modules.CounterModule)
}, {
  path: 'rxjs-examples',
  loadChildren: () => import('@rxjs-exam/rxjs-examples.module').then(modules => modules.RxjsExamplesModule)
}, {
  path: '',
  redirectTo: 'home',
  pathMatch: 'prefix'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
