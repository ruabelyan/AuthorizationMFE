import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class ChangePasswordRequestModel {
  @AutoMap()
  confirmPassword: string;

  @AutoMap()
  newPassword: string;

  @AutoMap()
  userId: PrimaryKey;
}
