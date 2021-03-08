// Dependencies
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';

// Assets
import * as AuthSelectors from '@chat/modules/auth/state/auth.selectors';
import * as AuthReducer from '@chat/modules/auth/state/auth.reducer';
import * as AuthActions from '@chat/modules/auth/state/auth.actions';

@Component({
  selector: 'chat-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {

  public error$: Observable<string>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<AuthReducer.State>) {
    this.error$ = this.store.select(AuthSelectors.getAuthError);
    this.isLoading$ = this.store.select(AuthSelectors.getAuthIsLoading);
  }

  public getCurrentState(): void {
    this.store.select(AuthSelectors.getAuthState).pipe(take(1)).subscribe(res => console.log(`%c AUTH STATE ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, res));
  }

  public logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

}
