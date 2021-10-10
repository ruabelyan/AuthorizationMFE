import { all } from '@redux-saga/core/effects';
import testSagas from './test';

export default function* rootSaga() {
  yield all([...testSagas]);
}
