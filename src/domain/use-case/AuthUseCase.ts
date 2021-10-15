import { inject, injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { LoginRequestModel } from '../models';

@injectable()
export class AuthUseCase {
  @inject('IAuthRepository')
  private readonly authRepository: IAuthRepository;

  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> => {
    return this.authRepository.login(loginRequestModel);
  };
}
