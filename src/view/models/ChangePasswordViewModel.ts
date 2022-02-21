import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangePasswordViewModel {
  @AutoMap()
  confirmPassword: string;

  @AutoMap()
  newPassword: string;

  @AutoMap()
  userId: PrimaryKey;
}
