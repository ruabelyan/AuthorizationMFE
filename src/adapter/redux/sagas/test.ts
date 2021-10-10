import { fork, takeLatest } from 'redux-saga/effects';
import { testActions, testTypes } from '../actions';

function* test(action: ReturnType<typeof testActions.test>) {
  yield;
}

function* watchTestSaga() {
  yield takeLatest(testTypes.TEST, test);
}

const testSagas = [fork(watchTestSaga)];

export default testSagas;
