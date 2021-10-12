import { User } from '../entities';
import { LoginRequestModel } from '../types';

export interface IAuthRepository {
  login(loginRequestModel: LoginRequestModel): Promise<User>;
}
