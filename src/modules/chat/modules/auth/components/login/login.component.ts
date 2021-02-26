// Dependencies
import { Component } from '@angular/core';

// Assets
import { IUser, iUserDefaultInstance } from '@core/interfaces/IUser.model';
import { AuthService } from '@chat/modules/auth/services/auth.service';

@Component({
  selector: 'chat-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  public user: IUser;

  constructor(
    private authService: AuthService
  ) {
    this.user = iUserDefaultInstance();
  }

  public login(): void {
    this.authService.login(this.user).subscribe((res: any) => {
      console.log("--->", res);
    });
  }

}
