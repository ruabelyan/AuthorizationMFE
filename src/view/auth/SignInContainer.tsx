import { authActions } from '@/adapter/redux/actions';
import { selectLoginLoading } from '@/adapter/redux/selectors';
import { ReduxStore } from '@/adapter/redux/types';
import { connect } from 'react-redux';
import SignIn, { SignInActions, SignInState } from './SignIn';

export default connect<SignInState, SignInActions>(
  (state: ReduxStore) => ({
    isLoading: selectLoginLoading(state)
  }),
  {
    onSubmit: authActions.loginRequest
  }
)(SignIn);
