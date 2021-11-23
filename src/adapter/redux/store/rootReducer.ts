import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../api';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer
});

export default rootReducer;
