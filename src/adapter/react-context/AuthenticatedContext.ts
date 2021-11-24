import { OidcUser } from '@/services';
import { createContext } from 'react';

export interface IAuthenticatedContext {
  user: OidcUser;
}

export const AuthenticatedContext = createContext<IAuthenticatedContext>(null);
