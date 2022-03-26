import { LOCAL_STORAGE_CONSTANTS } from '@/configs';
import { DI_CONSTANTS } from '@/di';
import { mapper } from '@/mapper';
import { oidcService } from '@/services';
import { LoginViewModel } from '@/view/models';
import { delay, StorageService } from '@atom/common';
import { IUserRepository, ParseIdTokenResponseModel } from '@atom/user-management';
import { inject, injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { DELAY_AFTER_RESPONSE } from '../configs';
import { LoginRequestModel } from '../models';

@injectable()
export class AuthUseCase {
  @inject(DI_CONSTANTS.LocalStorageService)
  private readonly localStorageService: StorageService;

  @inject(DI_CONSTANTS.AuthRepository)
  private readonly authRepository: IAuthRepository;

  @inject(DI_CONSTANTS.UserRepository)
  private readonly userRepository: IUserRepository;

  parseIdToken = async (idToken: string): Promise<ParseIdTokenResponseModel> => {
    return this.userRepository.parseIdToken(idToken);
  };

  login = async (loginViewModel: LoginViewModel): Promise<boolean> => {
    const loginRequestModel = mapper.map(loginViewModel, LoginRequestModel, LoginViewModel);

    const loginResponseModel = await this.authRepository.login(loginRequestModel);

    await delay(DELAY_AFTER_RESPONSE);

    this.localStorageService.setItem(LOCAL_STORAGE_CONSTANTS.USER_ACCESS_TOKEN, loginResponseModel.token);

    window.location.replace(loginViewModel.returnUrl);

    return true;
  };

  logout = async (): Promise<boolean> => {
    const isOk = await this.authRepository.logout();

    if (isOk) {
      oidcService.logOutCallback();
      window.location.replace(window.origin);

      return true;
    }
  };
}
