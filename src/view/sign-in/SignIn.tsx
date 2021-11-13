import { LoginViewModel } from '@/models';
import { useTranslation } from '@atom/common';
import { SignIn as SignInComponent } from '@atom/design-system';
import { Field, Form, Formik } from 'formik';
import { UserManager, UserManagerSettings } from 'oidc-client';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { SchemaOf } from 'yup';
import { Spinner } from '../spiner';

export type SignInActions = {
  onSubmit: (loginViewModel: LoginViewModel) => void;
  clearErrorMessage: () => void;
};

export type SignInState = {
  isLoading: boolean;
  loginErrorMessageName: string;
  validationSchema: SchemaOf<LoginViewModel> | null;
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
    const userManagerSettings: UserManagerSettings = {
      client_id: 'spa',
      redirect_uri: 'http://localhost:9000/login',
      response_type: 'code',
      scope: 'openid profile',
      authority: 'https://localhost:5002/',
      post_logout_redirect_uri: 'http://localhost:5002/signout-oidc'
    };

    const userManager = new UserManager(userManagerSettings);

    // userManager.signinRedirect();
    userManager.getUser().then(console.log).catch(console.log);
  }, []);

  return (
    <>
      {isLoading && <Spinner />}

      <Formik
        enableReinitialize
        initialValues={signInFormInitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {() => (
          <Form noValidate>
            <SignInComponent
              usernameInputName='username'
              passwordInputName='password'
              usernameInputLabel={t.get('login.username')}
              passwordInputLabel={t.get('login.password')}
              title={t.get('login.title')}
              subtitle={t.get('login.subtitle')}
              buttonText={t.get('login.buttonText')}
              loginErrorMessage={loginErrorMessageName && t.get(`login.${loginErrorMessageName}`)}
              renderInputs={inputRenderer}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
