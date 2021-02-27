// Dependencies
import { Injectable } from '@angular/core';
import { from, Observable, of, pipe, throwError, interval } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

// Assets
import { IUser } from '@core/interfaces/IUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userFake: IUser

  constructor() {
    this.userFake = {
      email: "ngrx@gmail.com",
      password: "ngrxpassword",
      username: "ngrx"
    }
  }

  public login(user: IUser): Observable<any> {
    let res = {
      isLoading: false,
      error: true,
      user: user
    };
    if(JSON.stringify(user) === JSON.stringify(this.userFake)) {
      res = {
        isLoading: false,
        error: false,
        user: user
      };
      return of(res).pipe(delay(5000));
    } else {
      return interval(4000).pipe(switchMap(n => throwError(res)));
    }
  }

}
