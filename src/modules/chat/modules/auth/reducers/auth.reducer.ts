// Assets
import * as AuthActions from '@chat/modules/auth/actions/auth.actions';
import { AuthActionTypes } from '@chat/modules/auth/actions/auth.actions';
import { IUser, iUserDefaultInstance } from '@core/interfaces/IUser.model';

export interface State {
  user: IUser;
  tokens?: Array<any>;
  error?: string;
  isLoading: boolean;
}

const initialState: State = {
  user: iUserDefaultInstance(),
  tokens: [],
  error: '',
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
        isLoading: false
      };
    default:
      return state;
  }
}

//export const getAuthState = (state: State) => state.user;
//export const getAuthAction = (action: any) => action.payload;
//export const getAuthError = (state: State) => state.error;
