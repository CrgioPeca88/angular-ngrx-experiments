// Dependencies
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

// Assets
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from '@chat/modules/auth/state/auth.effects';
import * as AuthReducer from './state/auth.reducer';

const NGRX_IMPORTS = [
  StoreModule.forFeature('auth', AuthReducer.authReducer),
  EffectsModule.forFeature([AuthEffects])
];

@NgModule({
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule,
    ...NGRX_IMPORTS
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule { }
