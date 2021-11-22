import { oidcService } from '@/services';
import { inject, injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { LoginRequestModel } from '../models';

@injectable()
export class AuthUseCase {
  @inject('IAuthRepository')
  private readonly authRepository: IAuthRepository;

  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(this.authRepository.login(loginRequestModel)), 1500);
    });

  logout = async (): Promise<boolean> => {
    const isOk = await this.authRepository.logout();

    if (isOk) {
      oidcService.logOutCallback();
      window.location.replace(window.origin);

      return true;
    }
  };
}
