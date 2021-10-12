import { inject, injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { LoginRequestModel } from '../types';
import { User } from './../entities';

@injectable()
export class AuthUseCase {
  @inject('IAuthRepository')
  private readonly authRepository: IAuthRepository;

  login = async (loginRequestModel: LoginRequestModel): Promise<User> => {
    console.log(this);
    return this.authRepository.login(loginRequestModel);
  };
}
