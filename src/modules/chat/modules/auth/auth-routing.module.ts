// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assets
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: '',
    component: LoginComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
