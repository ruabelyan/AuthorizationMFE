import { LoginRequestModel } from '@/domain/types';
import { InferValueTypes } from '../types';

const MODULE_NAME = 'AUTH';

export const authTypes = {
  LOGIN_REQUEST: `${MODULE_NAME}/LOGIN_REQUEST`
} as const;

export const authActions = {
  loginRequest: (loginRequestModel: LoginRequestModel) => ({
    type: authTypes.LOGIN_REQUEST,
    payload: loginRequestModel
  })
};

export type AuthActions = ReturnType<InferValueTypes<typeof authActions>>;
