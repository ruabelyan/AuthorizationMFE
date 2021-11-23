import { LoginRequestModel } from '@/domain/models';
import { LoginViewModel } from '@/view/models';
import type { MappingProfile } from '@automapper/core';

export const baseProfile: MappingProfile = (mapper) => {
  //#region Auth
  mapper.createMap(LoginViewModel, LoginRequestModel);
  //#endregion
};
