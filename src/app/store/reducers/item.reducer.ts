import { createReducer } from '@ngrx/store';

const initialState = [1, 2, 3];

export const itemReducer = createReducer(
  initialState
);
