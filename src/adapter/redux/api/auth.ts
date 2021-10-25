import { LoginRequestModel } from '@/domain/models';
import { AuthUseCase } from '@/domain/use-case';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../helpers';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createBaseQuery<AuthUseCase>({ useCaseName: 'AuthUseCase' }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginRequestModel: LoginRequestModel) => ({
        methodName: 'login',
        methodArguments: [loginRequestModel]
      })
    })
  })
});
