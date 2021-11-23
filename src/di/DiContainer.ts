import { AuthRepository } from '@/data/repositories';
import { IAuthRepository } from '@/domain/boundaries';
import { AuthUseCase } from '@/domain/use-case';
import { enviromentService, HttpService } from '@atom/common';
import { Container } from 'inversify';
import { DI_CONSTANTS } from '.';

export type DiConfig = {
  modulePath: string;
  moduleName: string;
};

export type DiFiles = {
  module: any;
  name: string;
};

export class DiContainer {
  public diContainer: Container;
  public diFiles: DiFiles[] = [];

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

    // Repositories
    this.diContainer.bind<IAuthRepository>(DI_CONSTANTS.AuthRepository).to(AuthRepository);

    // Use cases
    this.diContainer.bind<IAuthRepository>(DI_CONSTANTS.AuthUseCase).to(AuthUseCase);
  };
}

export const containerInstance = new DiContainer();
