// Dependencies
import { ActionReducer } from '@ngrx/store';

// Assets
import * as AuthActions from '@chat/modules/auth/state/auth.actions';
import { IUser, iUserDefaultInstance } from '@core/interfaces/IUser.model';

export interface State {
  user: IUser;
  token?: string;
  error?: string;
  isLoading: boolean;
}

const initialState: State = {
  user: iUserDefaultInstance(),
  isLoading: false
}

export const authReducer: ActionReducer<State> = (state: State = initialState, action: AuthActions.actions) => {
  switch (action.type) {
    case AuthActions.AuthActionTypes.LoginUser:
      return {
        ...state,
        user: action.payload.user,
        isLoading: true
      };
      case AuthActions.AuthActionTypes.LoginUserError:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error
        };
    case AuthActions.AuthActionTypes.LoggedUser:
      return {
        ...state,
        isLoading: false,
        error: null,
        token: action.payload.token
      };
    case AuthActions.AuthActionTypes.Logout:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.AuthActionTypes.UserLogoutError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case AuthActions.AuthActionTypes.UserLogout:
      return {
        user: null,
        token: null,
        error: null,
        isLoading: false
      };
    default:
      return state;
  }
}

export const getAuthState: (s: State) => State = (state: State) => state;
export const getAuthError: (s: State) => string = (state: State) => {
  return (state) ? state.error : null;
};
export const getAuthIsLoading: (s: State) => boolean = (state: State) => {
  return (state) ? state.isLoading : null;
};
export const getAuthToken: (s: State) => string = (state: State) => state.token;
