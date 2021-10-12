import produce from 'immer';
import { AuthActions } from '../actions';

const INITIAL_STATE = {};

export const auth = (state = INITIAL_STATE, action: AuthActions): typeof INITIAL_STATE => {
  return produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  });
};
