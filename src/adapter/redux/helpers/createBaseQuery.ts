import { containerInstance } from '@/di';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

interface CreateBaseQueryArgument {
  useCaseName: string;
}

interface CreateBaseQueryReturnType<T extends Record<string, (...args: any[]) => void>>
  extends BaseQueryFn<
    {
      methodName: keyof T;
      methodArguments: Parameters<T[keyof T]>;
    },
    unknown,
    unknown
  > {}

export const createBaseQuery =
  <T extends {}>({ useCaseName }: CreateBaseQueryArgument): CreateBaseQueryReturnType<T> =>
  async ({ methodName, methodArguments }) => {
    const useCase = containerInstance.diContainer.get(useCaseName);

    const method = useCase[methodName] as (...args: any[]) => Promise<unknown>;

    return { data: await method(...(methodArguments as any[])) };
  };
