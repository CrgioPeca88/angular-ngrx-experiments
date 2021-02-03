// Dependencies
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// Assets
import * as action from '@counter/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent implements OnInit {
  public counter$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {}

  ngOnInit() {
    this.counter$ = this.store.pipe(select('counter'));
  }

  public increment() {
    this.store.dispatch(action.inc());
  }

  public decrement() {
    this.store.dispatch(action.dec());
  }

  public random() {
    this.store.dispatch(action.rdm());
  }

  public saltar(n: number) {
    this.store.dispatch(action.saltar({num: n}));
  }
}
