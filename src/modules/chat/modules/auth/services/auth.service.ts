// Dependencies
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

// Assets
import { IUser } from '@core/interfaces/IUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(user: IUser): Observable<any> {
    return from([true]);
  }

}
