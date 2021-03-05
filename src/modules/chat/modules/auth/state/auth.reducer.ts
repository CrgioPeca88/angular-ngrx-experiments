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
    default:
      return state;
  }
}

export const getAuthState: (s: State) => State = (state: State) => state;
export const getAuthError: (s: State) => string = (state: State) => state.error;
export const getAuthIsLoading: (s: State) => boolean = (state: State) => state.isLoading;
