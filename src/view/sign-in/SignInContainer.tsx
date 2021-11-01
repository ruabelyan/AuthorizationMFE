import { authApi } from '@/adapter/redux/api';
import { getLoginValidationSchema } from '@/validators';
import { redirectToURL, useAsync, useValidationTranslation } from '@atom/common';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SignIn from './SignIn';

const SignInContainer = () => {
  const [login, { error, isLoading, status }] = authApi.useLoginMutation();

  const t = useValidationTranslation();

  const validationSchema = useAsync(() => getLoginValidationSchema(t));

  const dispatch = useDispatch();

  const clearErrorMessage = useCallback(() => dispatch(authApi.util.resetApiState()), []);

  useEffect(() => {
    if (status === QueryStatus.fulfilled) redirectToURL('/');
  }, [status]);

  return (
    <SignIn
      onSubmit={login}
      loginErrorMessageName={error && error.name}
      isLoading={isLoading}
      clearErrorMessage={clearErrorMessage}
      validationSchema={validationSchema}
    />
  );
};

export default SignInContainer;
