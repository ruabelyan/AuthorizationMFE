import { User } from '../entities';
import { LoginRequestModel } from '../models';

export interface IAuthRepository {
  login(loginRequestModel: LoginRequestModel): Promise<User>;
}
