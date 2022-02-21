import { IAuthRepository } from '@/domain/boundaries';
import { ChangeUserPasswordRequestModel, LoginRequestModel, LoginResponseModel } from '@/domain/models';
import { IHttpService, ActionResponseModel } from '@atom/common';
import { inject, injectable } from 'inversify';
import { API_ROUTES } from '../constants';

@injectable()
export class AuthRepository implements IAuthRepository {
  @inject('IHttpService')
  private readonly httpService: IHttpService;

  login = async (loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> => {
    const response = await this.httpService.post<LoginResponseModel, {}, {}>({
      url: API_ROUTES.AUTH.LOGIIN,
      body: {
        email: loginRequestModel.email,
        password: loginRequestModel.password,
        returnUrl: loginRequestModel.returnUrl
      }
    });

    return response;
  };

  logout = async (): Promise<boolean> => {
    await this.httpService.get({
      url: API_ROUTES.AUTH.LOGOUT
    });

    return true;
  };
  changePassword = async (
    changePasswordRequestModel: ChangeUserPasswordRequestModel
  ): Promise<ActionResponseModel> => {
    return await this.httpService.put<ActionResponseModel, ChangeUserPasswordRequestModel, {}>({
      url: API_ROUTES.AUTH.CHANGE_PASSWORD,
      body: changePasswordRequestModel
    });
  };
}
