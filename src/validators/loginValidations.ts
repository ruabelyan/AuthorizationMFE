import { LoginRequestModel } from '@/domain/types';
import { object, SchemaOf, string } from 'yup';

export const loginValidationSchema: SchemaOf<LoginRequestModel> = object({
  username: string().required('Required field').max(40, 'The maximum length is 40').min(7, 'The minimum symbols is 7'),
  password: string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Incorrect parameters')
    .min(8, 'The minimum length is 8!')
    .max(55, 'The maximum length is 55!')
    .required('Required field')
});
