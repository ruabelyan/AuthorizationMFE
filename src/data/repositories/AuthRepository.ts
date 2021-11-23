import { IAuthRepository } from '@/domain/boundaries';
import { LoginRequestModel } from '@/domain/models';
import { IHttpService, NotFoundError } from '@atom/common';
import { inject, injectable } from 'inversify';
import { API_ROUTES } from '../constants';

@injectable()
export class AuthRepository implements IAuthRepository {
  @inject('IHttpService')
  private readonly httpService: IHttpService;

  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> => {
    try {
      const response = await this.httpService.post<{ isOk: boolean; redirectUrl: string }, {}, {}>({
        url: API_ROUTES.AUTH.LOGIIN,
        body: {
          username: loginRequestModel.username,
          password: loginRequestModel.password,
          returnUrl: loginRequestModel.returnUrl
        }
      });

      if (response.isOk) window.location.replace(response.redirectUrl);

      return true;
    } catch (error) {
      throw new NotFoundError('user-not-found');
    }
  };

  logout = async (): Promise<boolean> => {
    await this.httpService.get({
      url: API_ROUTES.AUTH.LOGOUT
    });

    return true;
  };
}
