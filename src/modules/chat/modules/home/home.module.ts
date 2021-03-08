// Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Assets
import { RootComponent } from '@chat/modules/home/components/root/root.component';
import { HomeComponent } from '@chat/modules/home/components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule
  ],
  declarations: [
    RootComponent,
    HomeComponent
  ]
})
export class HomeModule { }
