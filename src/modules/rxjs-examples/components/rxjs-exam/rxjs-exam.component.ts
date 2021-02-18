// Dependencies
import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs-exam',
  templateUrl: './rxjs-exam.component.html',
  styleUrls: ['./rxjs-exam.component.less']
})
export class RxjsExComponent implements OnInit {

  @ViewChild('oc') oc: ElementRef;
  private observable$: Observable<string>;

  constructor(
    private renderer2: Renderer2
  ) {
    this.observable$ = Observable.create((o: any) => {
      try {
        o.next('Hello');
        o.next('How are you?');
        setInterval(() => {
          o.next('I am good');
        }, 2000);
      } catch( error ) {
        o.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.observable$.subscribe((data: string) => {
      console.log(data);
    });
  }

}
