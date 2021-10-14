import produce from 'immer';
import { AuthActions, authTypes } from '../actions';

const INITIAL_STATE = { isLoading: false };

export const auth = (state = INITIAL_STATE, action: AuthActions): typeof INITIAL_STATE => {
  return produce(state, (draft) => {
    switch (action.type) {
      case authTypes.CHANGE_LOGIN_LOADING:
        draft.isLoading = action.payload;
        break;
      default:
        break;
    }
  });
};
