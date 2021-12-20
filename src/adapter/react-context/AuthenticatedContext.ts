import { OidcUser } from '@/services';
import { ParseIdTokenResponseModel } from '@atom/user-management';
import { createContext } from 'react';

export interface IAuthenticatedContext {
  oidcUser: OidcUser;
  user: ParseIdTokenResponseModel;
}

export const AuthenticatedContext = createContext<IAuthenticatedContext>(null);
