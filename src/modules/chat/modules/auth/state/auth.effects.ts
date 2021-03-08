// Dependencies
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, flatMap, exhaustMap, switchMap, tap, catchError } from 'rxjs/operators';

// Assets
import * as aa from '@chat/modules/auth/state/auth.actions';
import { AuthService } from '@chat/modules/auth/services/auth.service';
import * as AuthReducer from '@chat/modules/auth/state/auth.reducer';
import * as AuthSelectors from '@chat/modules/auth/state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthReducer.State>
  ) {}

  @Effect()
  LoginUser$: Observable<Action> = this.actions$.pipe(
    ofType<aa.LoginUser>(aa.AuthActionTypes.LoginUser),
    map(lu => lu.payload),
    exhaustMap(payload => {
      return this.authService.login(payload.user).pipe(
        map(response => new aa.LoggedUser({user: response.user, token: response.token})),
        catchError(error => of(new aa.LoginUserError(error)))
      )
    })
  );

  @Effect({ dispatch: false })
  LoggedUser$: Observable<Action> = this.actions$.pipe(
    ofType<aa.LoggedUser>(aa.AuthActionTypes.LoggedUser),
    tap(a => this.router.navigate(['/ngrx-chat/home']))
  );

  @Effect()
  Logout$: Observable<Action> = this.actions$.pipe(
    ofType<aa.Logout>(aa.AuthActionTypes.Logout),
    flatMap(lo => this.store.select(AuthSelectors.getAuthToken)),
    exhaustMap((token: string) => {
      return this.authService.logout(token).pipe(
        map(response => new aa.UserLogout()),
        catchError(error => of(new aa.UserLogoutError(error)))
      )
    })
  );

  @Effect({ dispatch: false })
  UserLogout$: Observable<Action> = this.actions$.pipe(
    ofType<aa.UserLogout>(aa.AuthActionTypes.UserLogout),
    tap(a => this.router.navigate(['/ngrx-chat/login']))
  );

}
