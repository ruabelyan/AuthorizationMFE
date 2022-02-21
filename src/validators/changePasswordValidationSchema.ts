import { ChangePasswordViewModel, LoginViewModel } from '@/view/models';
import { regexLibrary, UseValidationTranslationReturnValue } from '@atom/common';
import { object, SchemaOf, string, ref } from 'yup';

export const getChangePasswordValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<ChangePasswordViewModel, 'userId' | 'password'>>> => {
  return object({
    newPassword: string()
      .nullable()
      .min(8, t.min(8))
      .max(55, t.max(55))
      .matches(regexLibrary.PASSWORD_INPUT, t.password())
      .required(t.required()),
    confirmPassword: string()
      .nullable()
      .min(8, t.min(8))
      .max(55, t.max(55))
      .matches(regexLibrary.PASSWORD_INPUT, t.password())
      .required(t.required())
      .oneOf([ref('newPassword'), null], 'Passwords must be same')
  });
};
