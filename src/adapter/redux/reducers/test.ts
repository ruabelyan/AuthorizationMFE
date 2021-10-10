import produce from 'immer';
import { TestActions } from '../actions';

const INITIAL_STATE = {};

export const test = (state = INITIAL_STATE, action: TestActions): typeof INITIAL_STATE => {
  return produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  });
};
