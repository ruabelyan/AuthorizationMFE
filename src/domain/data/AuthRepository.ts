import { injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { UserEntity } from '../entities';
import { LoginRequestModel } from '../types';

@injectable()
export class AuthRepository implements IAuthRepository {
  login = async (loginRequestModel: LoginRequestModel) => {
    console.log(loginRequestModel);

    return new UserEntity({
      id: '1',
      name: loginRequestModel.username
    }).user;
  };
}
