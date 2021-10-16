import produce from 'immer';
import { AuthActions, authTypes } from '../actions';

const INITIAL_STATE = { isLoading: false, loginErrorMessage: '' };

export const auth = (state = INITIAL_STATE, action: AuthActions): typeof INITIAL_STATE => {
  return produce(state, (draft) => {
    switch (action.type) {
      case authTypes.CHANGE_LOGIN_LOADING:
        draft.isLoading = action.payload;
        break;
      case authTypes.SET_LOGIN_ERROR:
        draft.loginErrorMessage = action.payload;
        break;
      default:
        break;
    }
  });
};
