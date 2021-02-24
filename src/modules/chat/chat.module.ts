// Dependencies
import { NgModule } from '@angular/core';

// Assets
import { ChatComponent } from '@chat/components/chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  imports: [
    ChatRoutingModule
  ],
  declarations: [
    ChatComponent
  ]
})
export class ChatModule { }
