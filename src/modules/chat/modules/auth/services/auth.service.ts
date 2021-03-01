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
      username: "ngrx",
      password: "ngrxpassword"
    }
  }

  public login(user: IUser): Observable<any> {
    if(JSON.stringify(user) === JSON.stringify(this.userFake)) {
      let res = { token: 'jdsjkfdsjfdjdsfjkfds.fufuidfsfddfdsfds.jfddfsdfdfsfdsfdsfdsfds' };
      return of(res).pipe(delay(5000));
    } else {
      let res = { error: 'Error al iniciar sesión, revise credenciales y vuelva a intentar' };
      return interval(4000).pipe(switchMap(n => throwError(res)));
    }
  }

}
