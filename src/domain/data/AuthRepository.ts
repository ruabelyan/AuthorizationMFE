import { injectable } from 'inversify';
import { UserEntity } from '../entities';
import { LoginRequestModel } from '../models';
UserEntity
@injectable()
export class AuthRepository {
  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> => {
    return loginRequestModel.password === 'AdminUser' && loginRequestModel.username === 'AdminUser'
  };
}
