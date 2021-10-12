import { AuthUseCase } from '@/domain/use-case';
import { fork, getContext, takeLatest, call } from 'redux-saga/effects';
import { authActions, authTypes } from '../actions';

function* login(action: ReturnType<typeof authActions.loginRequest>) {
  const authUseCase: AuthUseCase = yield getContext('AuthUseCase');

  const user = yield call(authUseCase.login, action.payload);
}

function* watchLoginRequest() {
  yield takeLatest(authTypes.LOGIN_REQUEST, login);
}

const authSagas = [fork(watchLoginRequest)];

export default authSagas;
