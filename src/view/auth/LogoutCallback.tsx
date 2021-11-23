import { authApi } from '@/adapter/redux/api';
import { useEffect } from 'react';

const LogoutCallback = () => {
  const [logout] = authApi.useLogoutMutation();

  useEffect(() => {
    logout([]);
  }, []);

  return null;
};

export default LogoutCallback;
