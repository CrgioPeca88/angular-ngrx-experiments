// Dependencies
import { NgModule } from '@angular/core';

// Assets
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule { }
