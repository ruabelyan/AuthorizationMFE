import { AuthUseCase } from '@/domain/use-case';
import { call, delay, fork, getContext, put, takeLatest } from 'redux-saga/effects';
import { authActions, authTypes } from '../actions';

function* login(action: ReturnType<typeof authActions.loginRequest>) {
  const authUseCase: AuthUseCase = yield getContext('AuthUseCase');

  yield put(authActions.changeLoginLoading(true));

  const user = yield call(authUseCase.login, action.payload);

  yield delay(2000);
  yield put(authActions.changeLoginLoading(false));
}

function* watchLoginRequest() {
  yield takeLatest(authTypes.LOGIN_REQUEST, login);
}

const authSagas = [fork(watchLoginRequest)];

export default authSagas;
