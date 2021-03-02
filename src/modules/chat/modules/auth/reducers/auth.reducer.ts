// Assets
import * as AuthActions from '@chat/modules/auth/actions/auth.actions';
import { AuthActionTypes } from '@chat/modules/auth/actions/auth.actions';
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

export function AuthReducer(state: State = initialState, action: AuthActions.actions): State {
  switch (action.type) {
    case AuthActionTypes.LoginUser:
      return {
        ...state,
        user: action.payload.user,
        isLoading: true
      };
      case AuthActionTypes.LoginUserError:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error
        };
    case AuthActionTypes.LoggedUser:
      return {
        ...state,
        isLoading: false,
        error: null,
        token: action.payload.token
      };
    default:
      return state;
  }
}

export const getAuthState: (s: State) => State = (state: State) => state;
export const getAuthError: (s: State) => string = (state: State) => state.error;
export const getAuthIsLoading: (s: State) => boolean = (state: State) => state.isLoading;
