// Dependencies
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

// Assets
import * as AuthSelector from '@chat/modules/auth/state/auth.selectors';
import * as AuthReducer from '@chat/modules/auth/state/auth.reducer';

@Component({
  selector: 'chat-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {

  constructor(private store: Store<AuthReducer.ReducerAuth>) {}

  public getCurrentState(): void {
    this.store.select(AuthSelector.getAuthState).subscribe(res => console.log(`%c AUTH STATE ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, res));
  }
}
