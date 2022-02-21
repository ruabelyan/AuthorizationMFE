import React, { useCallback, useMemo, useState } from 'react';
import { useQueryString, useAsync, useTranslation, useValidationTranslation } from '@atom/common';
import ChangePasswordPage from './ChangePasswordPage';
import { getChangePasswordValidationSchema } from '@/validators/changePasswordValidationSchema';
import { authApi } from '@/adapter/redux/api';
import { ChangePasswordViewModel } from '@/view/models';
import { ChangePasswordCustomErrorsEnum } from '@/view/models/enums';
import { alert } from '@atom/design-system';

const changePasswordPageContainer = () => {
  const queries = useQueryString<{ ReturnUrl?: string }>();

  const [changePassword, { error, isLoading, status }] = authApi.useChangePasswordMutation();

  const t = useValidationTranslation();

  const translation = useTranslation();

  const [invalidUserMessage, setInvalidUserMessage] = useState('');

  const customErrors = useMemo(
    () => ({
      [ChangePasswordCustomErrorsEnum.NO_VALIDATE_PASSWORD]: [
        {
          fieldKey: 'password',
          errorMessage: translation.get('blockedUser')
        }
      ]
    }),
    [t]
  );

  const onSubmit = useCallback(
    (values: ChangePasswordViewModel, formikHelper) => {
      changePassword({ ...values })
        .unwrap()
        .catch((error: { message: ChangePasswordCustomErrorsEnum }) => {
          if (error.message) {
            if (+error.message === ChangePasswordCustomErrorsEnum.NO_VALIDATE_PASSWORD) {
              setInvalidUserMessage(translation.get('asdsd'));

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
    },
    [queries]
  );

  const validationSchema = useAsync(() => getChangePasswordValidationSchema(t));

  const clearErrorMessage = useCallback(() => {
    setInvalidUserMessage('');
  }, []);

  return (
    <ChangePasswordPage
      validationSchema={validationSchema}
      changePasswordErrorMessageName={invalidUserMessage}
      isLoading={isLoading}
      clearErrorMessage={clearErrorMessage}
      onSubmit={onSubmit}
    />
  );
};

export default changePasswordPageContainer;
