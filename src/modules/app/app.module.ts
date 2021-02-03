// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Assets
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/components/app/app.component';
import { CounterModule } from '@counter/counter.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CounterModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
