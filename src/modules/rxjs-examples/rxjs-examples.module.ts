// Dependencies
import { NgModule } from '@angular/core';

// Assets
import { RxjsExComponent } from './components/rxjs-exam/rxjs-exam.component';
import { RxjsExamplesRoutingModule } from './rxjs-examples-routing.module';

@NgModule({
  imports: [
    RxjsExamplesRoutingModule
  ],
  declarations: [
    RxjsExComponent
  ]
})
export class RxjsExamplesModule { }
