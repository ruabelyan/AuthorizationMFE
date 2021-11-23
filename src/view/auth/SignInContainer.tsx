import { authApi } from '@/adapter/redux/api';
import { getLoginValidationSchema } from '@/validators';
import { LoginViewModel } from '@/view/models';
import { redirectToURL, useAsync, useQueryString, useValidationTranslation } from '@atom/common';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SignIn from './SignIn';

const SignInContainer = () => {
  const [login, { error, isLoading, status }] = authApi.useLoginMutation();

  const t = useValidationTranslation();

  const validationSchema = useAsync(() => getLoginValidationSchema(t));

  const queries = useQueryString<{ ReturnUrl?: string }>();

  const dispatch = useDispatch();

  const clearErrorMessage = useCallback(() => dispatch(authApi.util.resetApiState()), []);

  const onSubmit = useCallback(
    (values: LoginViewModel) => {
      if (queries.ReturnUrl) login({ ...values, returnUrl: queries.ReturnUrl });
    },
    [queries]
  );

  useEffect(() => {
    if (status === QueryStatus.fulfilled) redirectToURL('/');
  }, [status]);

  return (
    <SignIn
      onSubmit={onSubmit}
      loginErrorMessageName={error && error.name}
      isLoading={isLoading}
      clearErrorMessage={clearErrorMessage}
      validationSchema={validationSchema}
    />
  );
};

export default SignInContainer;
