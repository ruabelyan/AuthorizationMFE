import { HttpService, NotFoundError } from '@atom/common';
import { injectable } from 'inversify';
import { IAuthRepository } from '../boundaries';
import { LoginRequestModel } from '../models';

@injectable()
export class AuthRepository implements IAuthRepository {
  login = async (loginRequestModel: LoginRequestModel): Promise<boolean> => {
    const httpService = new HttpService({});

    const response = await httpService.post<{ data: { url: string } }>({
      url: 'https://localhost:5002/Account/Login',
      body: {
        Username: loginRequestModel.username,
        Password: loginRequestModel.password,
        ReturnUrl:
          'connect%2Fauthorize%2Fcallback%3Fclient_id%3Dspa%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%26state%3Da71a83efa2834e0d986d28f59cf4bdea%26code_challenge%3Dbylxhfr3_fTO-SPvbR06LHPko0s7H3ruLtG2OYAugIg%26code_challenge_method%3DS256%26response_mode%3Dquery',
        RememberLogin: true
      }
    });

    console.log(response.data.url);

    if (response.data.url) window.location.replace(response.data.url);

    const isValidCredentials = loginRequestModel.password === 'AdminUser' && loginRequestModel.username === 'AdminUser';

    if (!isValidCredentials) throw new NotFoundError('user-not-found');

    return true;
  };
}
