import { authApi } from '@/adapter/redux/api';
import { redirectToURL } from '@atom/common';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import SignIn from './SignIn';

const SignInContainer = () => {
  const [login, { error, isLoading, status }] = authApi.useLoginMutation();

  useEffect(() => {
    if (status === QueryStatus.fulfilled) redirectToURL('/');
  }, [status]);

  return (
    <SignIn onSubmit={login} loginErrorMessage={error as string} isLoading={isLoading} clearErrorMessage={() => {}} />
  );
};

export default SignInContainer;
