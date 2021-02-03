// Dependencies
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

// Assets
import * as action from '@counter/counter.actions';

export interface Action {
  buttonText: string;
  buttonAction: (n?: number) => void;
  applyButtonHover: boolean;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent implements OnInit {
  public counter$: Observable<number>;
  public actionsList: Action[];

  constructor(private store: Store<{ counter: number }>) {
    this.actionsList = [{
      buttonText: "Sumar",
      buttonAction: this.increment,
      applyButtonHover: false
    }, {
      buttonText: "Restar",
      buttonAction: this.decrement,
      applyButtonHover: false
    }, {
      buttonText: "Random",
      buttonAction: this.random,
      applyButtonHover: false
    }, {
      buttonText: "Fijar",
      buttonAction: this.saltar,
      applyButtonHover: false
    }]
  }

  ngOnInit() {
    this.counter$ = this.store.pipe(select('counter'));
  }

  private increment: () => void = () => {
    this.store.dispatch(action.inc());
  }

  private decrement: () => void = () => {
    this.store.dispatch(action.dec());
  }

  private random: () => void = () => {
    this.store.dispatch(action.rdm());
  }

  private saltar: () => void = () => {
    this.store.dispatch(action.saltar({num: 88}));
  }

}
