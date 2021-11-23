import { AutoMap } from '@automapper/classes';
export class LoginRequestModel {
  @AutoMap()
  username: string;

  @AutoMap()
  password: string;

  @AutoMap()
  returnUrl: string;
}
