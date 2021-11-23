import { AutoMap } from '@automapper/classes';

export class LoginViewModel {
  @AutoMap()
  username: string;

  @AutoMap()
  password: string;

  @AutoMap()
  returnUrl: string;
}
