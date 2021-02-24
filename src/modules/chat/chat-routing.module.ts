// Dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Assets
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [{
  path: '',
  component: ChatComponent,
  children: [{
    path: 'login',
    loadChildren: () => import('@chat/modules/auth/auth.module').then(modules => modules.AuthModule)
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
