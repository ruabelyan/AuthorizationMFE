import { injectable } from 'inversify';
import { LoginRequestModel } from '../models';
@injectable()
export class AuthRepository {
  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> => {
    return loginRequestModel.password === 'AdminUser' && loginRequestModel.username === 'AdminUser';
  };
}
