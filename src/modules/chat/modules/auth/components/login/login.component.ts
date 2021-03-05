// Dependencies
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AuthActions from '@chat/modules/auth/state/auth.actions';
import * as AuthSelectors from '@chat/modules/auth/state/auth.selectors';
import * as AuthReducer from '@chat/modules/auth/state/auth.reducer';

// Assets
import { IUser, iUserDefaultInstance } from '@core/interfaces/IUser.model';

@Component({
  selector: 'chat-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  public user: IUser;
  public error$: any;
  public isLoading$: any;

  constructor(private store: Store<AuthReducer.State>) {
    this.user = iUserDefaultInstance();
    this.error$ = this.store.select(AuthSelectors.getAuthError);
    this.isLoading$ = this.store.select(AuthSelectors.getAuthIsLoading);
  }

  public login(): void {
    const clone = { user: Object.assign({}, this.user ) };
    this.store.dispatch(new AuthActions.LoginUser(clone));
  }

}
