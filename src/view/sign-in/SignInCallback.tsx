import { oidcService } from '@/services';
import { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    oidcService.signinRedirectCallback();
  }, []);

  return null;
};

export default Callback;
