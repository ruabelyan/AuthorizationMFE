import { PrimaryKey } from '@atom/common';

export class LoginResponseModel {
  token: string;
  userId: PrimaryKey;
  userName: string;
}
