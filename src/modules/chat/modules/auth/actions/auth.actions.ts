// Dependencies
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoggedUser = `[Auth] LOGGED_USER`,
  LoginUser = `[Auth] LOGIN_USER`,
  LoginUserError = `[Auth] LOGIN_USER_ERROR`,
  LoggedIn = `[Auth] LOGGED_IN`,
  Logout = `[Auth] LOGOUT_USER`
}

export class LoggedIn implements Action {
  readonly type = AuthActionTypes.LoggedIn;
  constructor(public payload: { isLoggin: boolean }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
  constructor(public payload: { isLoggin: boolean }) {}
}

export class LoggedUser implements Action {
  readonly type = AuthActionTypes.LoggedUser;
  constructor(public payload: any) {}
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LoginUser;
  constructor(public payload: { user: string, pass: string }) {}
}

export class LoginUserError implements Action {
  readonly type = AuthActionTypes.LoginUserError;
  constructor(public payload: { error: string }) {}
}

export type actions = LoggedIn | Logout | LoggedUser | LoginUser | LoginUserError;
