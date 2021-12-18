import { AuthRepository } from '@/data/repositories';
import { IAuthRepository } from '@/domain/boundaries';
import { AuthUseCase } from '@/domain/use-case';
import { CacheService, enviromentService, HttpService, ICacheService } from '@atom/common';
import { IUserRepository, userHttpService, UserRepository } from '@atom/user-management';
import { Container } from 'inversify';
import { DI_CONSTANTS } from '.';

export class DiContainer {
  public diContainer: Container;

  public configure = () => {
    this.diContainer = new Container({
      defaultScope: 'Singleton'
    });

    this.diContainer.bind('IHttpService').toDynamicValue(
      () =>
        new HttpService({
          baseURL: enviromentService.get('identityServerApiUrl') + '/api',
          withCredentials: true
        })
    );

    this.diContainer.bind('UserHttpService').toDynamicValue(() => userHttpService);
    this.diContainer.bind<ICacheService>(DI_CONSTANTS.CacheService).to(CacheService);

    this.diContainer.bind<IAuthRepository>(DI_CONSTANTS.AuthRepository).to(AuthRepository);
    this.diContainer.bind<IUserRepository>(DI_CONSTANTS.UserRepository).to(UserRepository);

    // Use cases
    this.diContainer.bind(DI_CONSTANTS.AuthUseCase).to(AuthUseCase);
  };
}

export const containerInstance = new DiContainer();
