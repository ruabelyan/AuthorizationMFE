import { TestUseCase } from '@/domain/use-case';
import { fork, getContext, takeLatest } from 'redux-saga/effects';
import { testActions, testTypes } from '../actions';

function* test(action: ReturnType<typeof testActions.test>) {
  const testUseCase: TestUseCase = yield getContext('TestUseCase');

  testUseCase.test();

  yield;
}

function* watchTestSaga() {
  yield takeLatest(testTypes.TEST, test);
}

const testSagas = [fork(watchTestSaga)];

export default testSagas;
