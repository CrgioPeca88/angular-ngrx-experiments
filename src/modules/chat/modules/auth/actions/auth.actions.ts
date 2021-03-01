// Dependencies
import { Action } from '@ngrx/store';

// Assets
import { IUser } from '@core/interfaces/IUser.model';

export enum AuthActionTypes {
  LoginUser = `[Auth] LOGIN_USER`,
  LoggedUser = `[Auth] LOGGED_USER`,
  LoginUserError = `[Auth] LOGIN_USER_ERROR`,
  Logout = `[Auth] LOGOUT_USER`
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LoginUser;
  constructor(public payload: { user: IUser }) {}
}

export class LoggedUser implements Action {
  readonly type = AuthActionTypes.LoggedUser;
  constructor(public payload: any) {}
}

export class LoginUserError implements Action {
  readonly type = AuthActionTypes.LoginUserError;
  constructor(public payload: { error: string }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
  constructor(public payload: { isLogin: boolean }) {}
}


export type actions =  Logout | LoggedUser | LoginUser | LoginUserError;
