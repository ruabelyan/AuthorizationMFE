import { authApi } from '@/adapter/redux/api';
import { getLoginValidationSchema } from '@/validators';
import { LoginViewModel } from '@/view/models';
import { redirectToURL, useAsync, useQueryString, useTranslation, useValidationTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AddUserCustomErrorsEnum } from '../models/enums';
import SignIn from './SignIn';

const SignInContainer = () => {
  const [login, { error, isLoading, status }] = authApi.useLoginMutation();

  const t = useValidationTranslation();

  const translation = useTranslation();

  const validationSchema = useAsync(() => getLoginValidationSchema(t));

  const queries = useQueryString<{ ReturnUrl?: string }>();

  const dispatch = useDispatch();

  const clearErrorMessage = useCallback(() => dispatch(authApi.util.resetApiState()), []);

  const customErrors = useMemo<
    Record<AddUserCustomErrorsEnum, { fieldKey: keyof LoginViewModel; errorMessage: string }[]>
  >(
    () => ({
      [AddUserCustomErrorsEnum.WRONG_USER_NAME_OR_PASSWORD]: [
        {
          fieldKey: 'password',
          errorMessage: translation.get('wrongUserNameOrPassword')
        }
      ],
      [AddUserCustomErrorsEnum.BLOCKED_USER]: [
        {
          fieldKey: 'password',
          errorMessage: translation.get('blockedUser')
        }
      ],
      [AddUserCustomErrorsEnum.EXPIRED_USER]: [
        {
          fieldKey: 'password',
          errorMessage: translation.get('accessDenied')
        }
      ]
    }),
    [t]
  );

  const onSubmit = useCallback(
    (values: LoginViewModel, formikHelper) => {
      if (queries.ReturnUrl) {
        login({ ...values, returnUrl: queries.ReturnUrl })
          .unwrap()
          .catch((error: { message: AddUserCustomErrorsEnum }) => {
            if (error.message) {
              customErrors[error.message]?.forEach((error) => {
                formikHelper.setFieldError(error.fieldKey, error.errorMessage);
              });
            } else
              alert.error({
                alertLabel: translation.get('connectionError')
              });
          });
      }
    },
    [queries]
  );

  useEffect(() => {
    if (status === QueryStatus.fulfilled) redirectToURL('/');
  }, [status]);

  return (
    <SignIn
      onSubmit={onSubmit}
      // @ts-expect-error For typecasting BaseError
      loginErrorMessageName={error && error.name}
      isLoading={isLoading}
      clearErrorMessage={clearErrorMessage}
      validationSchema={validationSchema}
    />
  );
};

export default SignInContainer;
