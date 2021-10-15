import { AuthUseCase } from '@/domain/use-case';
import { call, delay, fork, getContext, put, takeLatest } from 'redux-saga/effects';
import { navigateToUrl } from 'single-spa';
import { authActions, authTypes } from '../actions';

function* login(action: ReturnType<typeof authActions.loginRequest>) {
  const authUseCase: AuthUseCase = yield getContext('AuthUseCase');

  yield put(authActions.changeLoginLoading(true));

  const isValidCredentials: boolean = yield call(authUseCase.login, action.payload);

  yield delay(2000);

  if (isValidCredentials) navigateToUrl('/dashboard');
  else yield put(authActions.setLoginError('Invalid credentials'));

  yield put(authActions.changeLoginLoading(false));
}

function* watchLoginRequest() {
  yield takeLatest(authTypes.LOGIN_REQUEST, login);
}

const authSagas = [fork(watchLoginRequest)];

export default authSagas;
