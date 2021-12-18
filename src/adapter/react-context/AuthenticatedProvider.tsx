import { containerInstance } from '@/di';
import { oidcService, OidcUser, userService } from '@/services';
import { useLoading } from '@atom/common';
import { ParseIdTokenResponseModel } from '@atom/user-management';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedContext } from './AuthenticatedContext';

let wasCalledGetUserBefore = false;

export const AuthenticatedProvider: FC = ({ children }) => {
  const [user, setUser] = useState<ParseIdTokenResponseModel>(null);

  const [oidcUser, setOidcUser] = useState<OidcUser>(null);

  const changeLoading = useLoading();

  useEffect(() => {
    containerInstance.configure();

    changeLoading(true);

    oidcService.getUser();

    userService.subscribeForUpdate((user) => {
      setUser(user);

      changeLoading(false);
    });

    oidcService.subscribe(async (oidcUser) => {
      setOidcUser(oidcUser);

      if (!wasCalledGetUserBefore) {
        userService.getUser(oidcUser.id_token);
      }

      wasCalledGetUserBefore = true;
    });
  }, []);

  if (!oidcUser || !user) return null;

  return (
    <AuthenticatedContext.Provider
      value={{
        oidcUser,
        user
      }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
