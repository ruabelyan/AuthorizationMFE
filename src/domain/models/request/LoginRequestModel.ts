import { AutoMap } from '@automapper/classes';
export class LoginRequestModel {
  @AutoMap()
  email: string;

  @AutoMap()
  password: string;

  @AutoMap()
  returnUrl: string;
}
