import { authApi } from '@/adapter/redux/api';
import { getLoginValidationSchema } from '@/validators';
import { LoginViewModel } from '@/view/models';
import { historyService, useAsync, useQueryString, useTranslation, useValidationTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AddUserCustomErrorsEnum } from '../models/enums';
import SignIn from './SignIn';

const SignInContainer = () => {
  const [login, { error, isLoading, status }] = authApi.useLoginMutation();

  const [invalidUserMessage, setInvalidUserMessage] = useState('');

  const t = useValidationTranslation();

  const translation = useTranslation();

  const validationSchema = useAsync(() => getLoginValidationSchema(t));

  const queries = useQueryString<{ ReturnUrl?: string }>();

  const clearErrorMessage = useCallback(() => {
    setInvalidUserMessage('');
  }, []);

  const customErrors = useMemo(
    () => ({
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
      ],
      [AddUserCustomErrorsEnum.WRONG_USER_NAME_OR_PASSWORD]: [
        {
          fieldKey: 'password',
          errorMessage: translation.get('wrongUserNameOrPassword')
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
              if (+error.message === AddUserCustomErrorsEnum.WRONG_USER_NAME_OR_PASSWORD) {
                setInvalidUserMessage(translation.get('wrongUserNameOrPassword'));

                return;
              }

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
    if (status === QueryStatus.fulfilled) historyService.redirectToURL('/');
  }, [status]);

  return (
      <SignIn
        onSubmit={onSubmit}
        loginErrorMessageName={invalidUserMessage}
        isLoading={isLoading}
        clearErrorMessage={clearErrorMessage}
        validationSchema={validationSchema}
      />
  );
};

export default SignInContainer;
