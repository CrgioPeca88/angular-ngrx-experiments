// Dependencies
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

// Assets
import * as chatReducers from '@chat/chat.reducers';

@Component({
  selector: 'chat-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {

  constructor(private store: Store<chatReducers.State>) {}

  public getCurrentState(): void {
    this.store.select(chatReducers.getAuthState).subscribe(res => console.log(`%c AUTH STATE ==>`, `color: white; background-color: #a829c3; border-radius: 4px`, res));
  }
}
