import { oidcService, OidcUser } from '@/services';
import { useLoading } from '@atom/common';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedContext } from './AuthenticatedContext';

export const AuthenticatedProvider: FC = ({ children }) => {
  const [user, setUser] = useState<OidcUser>(null);

  const changeLoading = useLoading();

  useEffect(() => {
    changeLoading(true);

    oidcService.getUser();

    oidcService.subscribe((user) => {
      setUser(user);

      changeLoading(false);
    });
  }, []);

  if (!user) return null;

  return (
    <AuthenticatedContext.Provider
      value={{
        user
      }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
