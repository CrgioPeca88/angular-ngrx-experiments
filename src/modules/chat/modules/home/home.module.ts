// Dependencies
import { NgModule } from '@angular/core';

// Assets
import { RootComponent } from '@chat/modules/home/components/root/root.component';
import { HomeComponent } from '@chat/modules/home/components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    HomeRoutingModule
  ],
  declarations: [
    RootComponent,
    HomeComponent
  ]
})
export class HomeModule { }
