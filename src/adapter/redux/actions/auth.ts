import { LoginRequestModel } from '@/domain/models';
import { InferValueTypes } from '../types';

const MODULE_NAME = 'AUTH';

export const authTypes = {
  LOGIN_REQUEST: `${MODULE_NAME}/LOGIN_REQUEST`,
  CHANGE_LOGIN_LOADING: `${MODULE_NAME}/CHANGE_LOGIN_LOADING`
} as const;

export const authActions = {
  loginRequest: (loginRequestModel: LoginRequestModel) => ({
    type: authTypes.LOGIN_REQUEST,
    payload: loginRequestModel
  }),
  changeLoginLoading: (isLoading: boolean) => ({
    type: authTypes.CHANGE_LOGIN_LOADING,
    payload: isLoading
  })
};

export type AuthActions = ReturnType<InferValueTypes<typeof authActions>>;
