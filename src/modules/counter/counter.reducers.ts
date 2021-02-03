// Dependencies
import { createReducer, on } from '@ngrx/store';

// Assets
import * as states from './counter.actions';

export const counter = 0;

const _counterReducer = createReducer(
  counter,
  on(states.inc, c => c + 1),
  on(states.dec, c => c - 1),
  on(states.rdm, c => Math.floor(Math.random() * 100)),
  on(states.saltar, (c, {num}) => num),
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
