// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assets
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ChatComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
