import { authActions } from '@/adapter/redux/actions';
import { selectLoginLoading } from '@/adapter/redux/selectors';
import { ReduxStore } from '@/adapter/redux/types';
import { connect } from 'react-redux';
import { selectLoginErrorMessage } from './../../adapter/redux/selectors/auth';
import SignIn, { SignInActions, SignInState } from './SignIn';

export default connect<SignInState, SignInActions>(
  (state: ReduxStore) => ({
    isLoading: selectLoginLoading(state),
    loginErrorMessage: selectLoginErrorMessage(state)
  }),
  {
    clearErrorMessage: () => authActions.setLoginError(null),
    onSubmit: authActions.loginRequest
  }
)(SignIn);
