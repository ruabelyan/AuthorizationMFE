import { all } from '@redux-saga/core/effects';
import authSagas from './auth';

export default function* rootSaga() {
  yield all([...authSagas]);
}
