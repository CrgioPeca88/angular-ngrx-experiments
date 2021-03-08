// Dependencies
import { Action } from '@ngrx/store';

// Assets
import { IUser } from '@core/interfaces/IUser.model';

export enum AuthActionTypes {
  LoginUser =       `[Auth] LOGIN_USER`,
  LoggedUser =      `[Auth] LOGGED_USER`,
  LoginUserError =  `[Auth] LOGIN_USER_ERROR`,
  Logout =          `[Auth] LOGOUT`,
  UserLogoutError = `[Auth] USER_LOGOUT_ERROR`,
  UserLogout =      `[Auth] USER_LOGOUT`
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LoginUser;
  constructor(public payload: { user: IUser }) {}
}

export class LoggedUser implements Action {
  readonly type = AuthActionTypes.LoggedUser;
  constructor(public payload: { user: IUser, token: string }) {}
}

export class LoginUserError implements Action {
  readonly type = AuthActionTypes.LoginUserError;
  constructor(public payload: { error: string }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
  constructor() {}
}

export class UserLogoutError implements Action {
  readonly type = AuthActionTypes.UserLogoutError;
  constructor(public payload: { error: string }) {}
}

export class UserLogout implements Action {
  readonly type = AuthActionTypes.UserLogout;
  constructor() {}
}

export type actions = LoggedUser | LoginUser | LoginUserError | Logout | UserLogoutError | UserLogout;
