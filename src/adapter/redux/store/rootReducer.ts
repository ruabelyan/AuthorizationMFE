import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../api';
import { auth } from '../reducers';

const rootReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer
});

export default rootReducer;
