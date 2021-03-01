// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assets
import { RootComponent } from './components/root/root.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{
  path: '',
  component: RootComponent,
  children: [{
    path: '',
    component: HomeComponent,
    pathMatch: 'prefix'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
