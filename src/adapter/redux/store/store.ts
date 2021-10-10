import { applyMiddleware, createStore } from 'redux';
import rootSaga from '../sagas';
import middleware, { sagaMiddleware } from './middlewares';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
