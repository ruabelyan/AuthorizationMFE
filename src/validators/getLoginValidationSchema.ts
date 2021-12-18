import { LoginViewModel } from '@/view/models';
import { UseValidationTranslationReturnValue } from '@atom/common';
import { object, SchemaOf, string } from 'yup';

export const getLoginValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<LoginViewModel, 'returnUrl'>>> => {
  return object({
    email: string()
      .required(t.required())
      .max(40, t.max(40))
      .min(6, t.min(6))
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid Email'
      ),
    password: string()
      .min(8, t.min(8))
      .max(55, t.max(55))
      .required(t.required())
      // eslint-disable-next-line no-useless-escape
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must include both lower and upper case letters , numbers and symbols'
      )
  });
};
