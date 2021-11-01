import { NotFoundError } from '@atom/common';
import { injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { LoginRequestModel } from '../models';

@injectable()
export class AuthRepository implements IAuthRepository {
  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> => {
    const isValidCredentials = loginRequestModel.password === 'AdminUser' && loginRequestModel.username === 'AdminUser';

    if (!isValidCredentials) throw new NotFoundError('user-not-found');

    return true;
  };
}
