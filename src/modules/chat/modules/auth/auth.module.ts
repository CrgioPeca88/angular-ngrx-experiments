// Dependencies
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Assets
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule { }
