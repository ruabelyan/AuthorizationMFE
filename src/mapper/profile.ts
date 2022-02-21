import { ChangePasswordRequestModel, LoginRequestModel } from '@/domain/models';
import { ChangePasswordViewModel, LoginViewModel } from '@/view/models';
import type { MappingProfile } from '@automapper/core';

export const baseProfile: MappingProfile = (mapper) => {
  //#region Auth
  mapper.createMap(LoginViewModel, LoginRequestModel);
  //#endregion

  //#region ChangePassword
  mapper.createMap(ChangePasswordViewModel, ChangePasswordRequestModel);
  //#endregion
};
