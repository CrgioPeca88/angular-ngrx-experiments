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

  private userFake: IUser;
  private token: string;

  constructor() {
    this.userFake = {
      username: "ngrx",
      password: "ngrxpassword"
    }
    this.token = 'jdsjkfdsjfdjdsfjkfds.fufuidfsfddfdsfds.jfddfsdfdfsfdsfdsfdsfds';
  }

  public login(user: IUser): Observable<any> {
    if(JSON.stringify(user) === JSON.stringify(this.userFake)) {
      let res = { token: this.token };
      return of(res).pipe(delay(5000));
    } else {
      let res = { error: 'Error al iniciar sesión, revise credenciales y vuelva a intentar' };
      return interval(4000).pipe(switchMap(n => throwError(res)));
    }
  }

  public logout(token: string): Observable<any> {
    if(token === this.token) {
      let res = { status: 200 };
      return of(res).pipe(delay(5000));
    } else {
      let res = { error: 'Error al cerrar sesión, intente de nuevo' };
      return interval(4000).pipe(switchMap(n => throwError(res)));
    }
  }

}
