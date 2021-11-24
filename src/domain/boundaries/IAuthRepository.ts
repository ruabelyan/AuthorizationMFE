import { LoginRequestModel, LoginResponseModel } from '../models';
export interface IAuthRepository {
  login(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel>;
  logout(): Promise<boolean>;
}
