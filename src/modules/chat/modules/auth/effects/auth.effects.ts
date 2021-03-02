// Dependencies
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, tap, catchError } from 'rxjs/operators';

// Assets
import { AuthActionTypes, LoggedUser, LoginUser, LoginUserError } from '@chat/modules/auth/actions/auth.actions';
import { AuthService } from '@chat/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LoginUser$: Observable<Action> = this.actions$.pipe(
    ofType<LoginUser>(AuthActionTypes.LoginUser),
    map(lue => lue.payload),
    exhaustMap(payload => {
      return this.authService.login(payload.user).pipe(
        map(response => new LoggedUser({user: response.user, token: response.token})),
        catchError(error => of(new LoginUserError(error)))
      )
    })
  );

  @Effect({ dispatch: false })
  LoggedUser$: Observable<Action> = this.actions$.pipe(
    ofType<LoggedUser>(AuthActionTypes.LoggedUser),
    tap(a => this.router.navigate(['/ngrx-chat/home']))
  );

}
