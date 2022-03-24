import { containerInstance } from '@/di';
import { oidcService, OidcUser, userService } from '@/services';
import { HttpService, useLoading } from '@atom/common';
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

    if (!wasCalledGetUserBefore) {
      oidcService.getUser();
    }

    userService.subscribeForUpdate((user) => {
      setUser(user);

      changeLoading(false);
    });

    oidcService.subscribeForUpdate(async (oidcUser) => {
      setOidcUser(oidcUser);

      if (oidcUser?.access_token) HttpService.setAccessToken(oidcUser.access_token);

      HttpService.setLogoutCb(() => oidcService.logOut());

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
        user,
        updateUserInfo: (updatedInfo: Partial<ParseIdTokenResponseModel>) => {
          const updatedUser = { ...user, ...updatedInfo };

          userService.publish(updatedUser);

          userService.user = updatedUser;
        }
      }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
