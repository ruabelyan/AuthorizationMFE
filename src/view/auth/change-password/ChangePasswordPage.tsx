import { ChangePassword } from '@atom/design-system';
import { FC, useCallback, useMemo, useEffect } from 'react';
import { Field, Form, FormikHelpers } from 'formik';
import { useTranslation, CustomForm, useLoading } from '@atom/common';
import { ChangePasswordViewModel, LoginViewModel } from '@/view/models';
import { SchemaOf } from 'yup';
import singleSpa from 'single-spa';

export type ChangePasswordActions = {
  onSubmit: (
    changePasswordViewModel: ChangePasswordViewModel,
    formikHelper: FormikHelpers<ChangePasswordViewModel>
  ) => void;
  clearErrorMessage: () => void;
};

export type ChangePasswordState = {
  isLoading: boolean;
  validationSchema: SchemaOf<Omit<ChangePasswordViewModel, 'password' | 'userId'>> | null;
  changePasswordErrorMessageName: string;
};

export type ChangePasswordProps = ChangePasswordActions & ChangePasswordState;

const ChangePasswordPage: FC<ChangePasswordProps> = ({
  onSubmit,
  validationSchema,
  isLoading,
  changePasswordErrorMessageName
}) => {
  const t = useTranslation();

  const updateLoading = useLoading();

  const inputRenderer = useCallback((InputComponent, name) => {
    return (
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <InputComponent
              {...field}
              name={name}
              startIcon={false}
              explanation={meta.touched && meta.error}
              color={meta.error && meta.touched ? 'danger' : ''}
            />
          );
        }}
      </Field>
    );
  }, []);

  const changePasswordFormInitialValues = useMemo(
    () => ({
      userId: 1,
      newPassword: '',
      confirmPassword: ''
    }),
    []
  );
  useEffect(() => {
    updateLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <CustomForm
        enableReinitialize
        initialValues={changePasswordFormInitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(form) => {
          console.log(form);
          return (
            <>
              <Form noValidate>
                <ChangePassword
                  confirmPasswordInputName='confirmPassword'
                  newPasswordInputName='newPassword'
                  renderInputs={inputRenderer}
                  title={t.get('changePassword')}
                  subTitle={t.get('changePasswordSubTitle')}
                  skipButton={t.get('skip')}
                  changeButton={t.get('change')}
                  newPasswordInputLabel={t.get('newPassword')}
                  confirmPasswordInputLabel={t.get('confirmPassword')}
                  //@ts-expect-error bca
                  changePasswordErrorMessage={
                    changePasswordErrorMessageName && t.get(`${changePasswordErrorMessageName}`)
                  }
                  skipOnSubmit={() => singleSpa.navigateToUrl('/')}
                />
              </Form>
            </>
          );
        }}
      </CustomForm>
    </>
  );
};

export default ChangePasswordPage;
