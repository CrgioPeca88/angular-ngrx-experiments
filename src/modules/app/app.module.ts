// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

// Assets
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/components/app/app.component';
import { CounterModule } from '@counter/counter.module';
import { RxjsExamplesModule } from '@rxjs-exam/rxjs-examples.module';
import { counterReducer } from '@counter/counter.reducers';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CounterModule,
    RxjsExamplesModule,
    StoreModule.forRoot({ counter: counterReducer})
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
