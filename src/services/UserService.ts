import { containerInstance, DI_CONSTANTS } from '@/di';
import { UserEntity } from '@/domain/entities';
import { AuthUseCase } from '@/domain/use-case';
import { Subscribable } from '@atom/common';
import { ParseIdTokenResponseModel } from '@atom/user-management';

class UserService extends Subscribable<ParseIdTokenResponseModel> {
  private user: UserEntity = null;

  subscribeForUpdate = (cb: (msg: ParseIdTokenResponseModel) => void) => {
    this.subscribe(cb);

    if (this.user) cb(this.user);
  };

  getUser = async (idToken: string) => {
    if (this.user) {
      this.publish(this.user);

      return;
    }

    const authUseCase = containerInstance.diContainer.get<AuthUseCase>(DI_CONSTANTS.AuthUseCase);

    const user = await authUseCase.parseIdToken(idToken);

    this.user = user;

    this.publish(user);
  };
}

export const userService = new UserService();
