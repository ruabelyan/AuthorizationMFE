import { ChangeUserPasswordRequestModel, LoginRequestModel, LoginResponseModel } from '../models';
import { ActionResponseModel } from '@atom/common';
export interface IAuthRepository {
  login(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel>;
  logout(): Promise<boolean>;
  changePassword(changePassword: ChangeUserPasswordRequestModel): Promise<ActionResponseModel>;
}
