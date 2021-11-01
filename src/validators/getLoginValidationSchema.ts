import { LoginViewModel } from '@/models/LoginViewModel';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { object, SchemaOf, string } from 'yup';

export const getLoginValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<LoginViewModel>> => {
  return object({
    username: string().required(t.required()).max(40, t.max(40)).min(6, t.min(6)),
    password: string().min(8, t.min(8)).max(55, t.max(55)).required(t.required())
  });
};
