import { UserEntity } from '@/domain/entities';
import { OidcUser } from '@/services';
import { createContext } from 'react';

export interface IAuthenticatedContext {
  oidcUser: OidcUser;
  user: UserEntity;
}

export const AuthenticatedContext = createContext<IAuthenticatedContext>(null);
