import { Middleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const middleware: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middleware.push(logger);

export default middleware;
