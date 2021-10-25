import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import * as apiReducers from '../api';
import rootReducer from './rootReducer';

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      [...getDefaultMiddleware(), ...Object.values(apiReducers).map((api) => api.middleware), logger] as ReturnType<
        typeof getDefaultMiddleware
      >
  });

  return store;
};

export default createStore;
