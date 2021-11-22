import { oidcService } from '@/services';
import { useEffect } from 'react';

const SignInCallback = () => {
  useEffect(() => {
    oidcService.signinRedirectCallback();
  }, []);

  return null;
};

export default SignInCallback;
