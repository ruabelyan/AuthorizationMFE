import { DI_CONSTANTS } from '@/di';
import { AuthUseCase } from '@/domain/use-case';
import { ChangePasswordViewModel, LoginViewModel } from '@/view/models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';
import { ActionResponseModel } from '@atom/common';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createBaseQuery<AuthUseCase>({ useCaseName: DI_CONSTANTS.AuthUseCase }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginViewModel: LoginViewModel) => ({
        methodName: 'login',
        methodArguments: [loginViewModel]
      })
    }),
    logout: build.mutation({
      query: () => ({
        methodName: 'logout',
        methodArguments: []
      })
    }),
    changePassword: build.mutation<ActionResponseModel, {}>({
      query: (changePasswordViewModel: ChangePasswordViewModel) => {
        return {
          methodName: 'changePassword',
          methodArguments: [changePasswordViewModel]
        };
      }
    })
  })
});
