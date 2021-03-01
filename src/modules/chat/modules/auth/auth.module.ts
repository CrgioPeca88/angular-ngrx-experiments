// Dependencies
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

// Assets
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from '@chat/modules/auth/effects/auth.effects';

@NgModule({
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule { }
