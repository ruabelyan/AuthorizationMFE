import { IHttpService } from '@atom/common';
import { inject, injectable } from 'inversify';
import queryString from 'query-string';
import { IAuthRepository } from '../boundaries';
import { LoginRequestModel } from '../models';

@injectable()
export class AuthRepository implements IAuthRepository {
  @inject('IHttpService')
  private readonly httpService: IHttpService;

  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> => {
    const qs = queryString.parse(window.location.search);

    const response = await this.httpService.post<{ isOk: boolean; redirectUrl: string }, {}, {}>({
      url: '/account/login',
      body: {
        username: loginRequestModel.username,
        password: loginRequestModel.password,
        returnUrl: qs.ReturnUrl
      }
    });

    if (response.isOk) window.location.replace(response.redirectUrl);

    // const isValidCredentials = loginRequestModel.password === 'AdminUser' && loginRequestModel.username === 'AdminUser';

    // if (!isValidCredentials) throw new NotFoundError('user-not-found');

    return true;
  };

  logout = async (): Promise<boolean> => {
    await this.httpService.get({
      url: '/account/logout'
    });

    return true;
  };
}
