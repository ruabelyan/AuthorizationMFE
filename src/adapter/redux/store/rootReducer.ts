import { combineReducers } from '@reduxjs/toolkit';
import * as apiReducers from '../api';
import * as reducers from '../reducers';

const rootReducer = combineReducers({
  ...reducers,
  ...Object.values(apiReducers).reduce((acc, api) => {
    return {
      ...acc,
      [api.reducerPath]: api.reducer
    };
  }, {})
} as {});

export default rootReducer;
