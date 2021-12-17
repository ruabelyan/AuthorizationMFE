import { useLoading, useTranslation } from '@atom/common';
import { SignIn as SignInComponent } from '@atom/design-system';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { SchemaOf } from 'yup';
import { LoginViewModel } from '../models';

export type SignInActions = {
  onSubmit: (loginViewModel: LoginViewModel, formikHelper: FormikHelpers<LoginViewModel>) => void;
  clearErrorMessage: () => void;
};

export type SignInState = {
  isLoading: boolean;
  loginErrorMessageName: string;
  validationSchema: SchemaOf<Omit<LoginViewModel, 'returnUrl'>> | null;
};

export type SignInProps = SignInActions & SignInState;

const SignIn: FC<SignInProps> = ({
  onSubmit,
  isLoading,
  loginErrorMessageName,
  clearErrorMessage,
  validationSchema
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
              onFocus={clearErrorMessage}
              name={name}
              explanation={meta.touched && meta.error}
              color={meta.error && meta.touched ? 'danger' : ''}
            />
          );
        }}
      </Field>
    );
  }, []);

  const signInFormInitialValues = useMemo(
    () => ({
      username: '',
      password: ''
    }),
    []
  );

  useEffect(() => {
    updateLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={signInFormInitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(form) => {
          return (
            <>
              <Form noValidate>
                <SignInComponent
                  usernameInputName='username'
                  passwordInputName='password'
                  usernameInputLabel={t.get('eMail')}
                  passwordInputLabel={t.get('password')}
                  title={t.get('signIn')}
                  subtitle={t.get('loginToManageYourAccount')}
                  buttonText={t.get('login')}
                  loginErrorMessage={loginErrorMessageName && t.get(`${loginErrorMessageName}`)}
                  renderInputs={inputRenderer}
                />
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SignIn;
