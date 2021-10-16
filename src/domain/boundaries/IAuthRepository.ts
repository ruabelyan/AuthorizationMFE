
export interface IAuthRepository {
  login(loginRequestModel: any): Promise<boolean>;
}
