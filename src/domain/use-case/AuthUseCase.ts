import { inject, injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { LoginRequestModel } from '../models';

@injectable()
export class AuthUseCase {
  @inject('IAuthRepository')
  private readonly authRepository: IAuthRepository;

  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(this.authRepository.login(loginRequestModel)), 3000);
    });
}
