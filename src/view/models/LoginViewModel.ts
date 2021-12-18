import { AutoMap } from '@automapper/classes';

export class LoginViewModel {
  @AutoMap()
  email: string;

  @AutoMap()
  password: string;

  @AutoMap()
  returnUrl: string;
}
