import { LoginViewModel } from '@/models/LoginViewModel';
import { loginValidationSchema } from '@/validators/loginValidations';
import { SignIn as SignInComponent } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import { FC, useCallback, useMemo } from 'react';
import { Spinner } from '../spiner';

export type SignInActions = {
  onSubmit: (loginViewModel: LoginViewModel) => void;
};

export type SignInState = {
  isLoading: boolean;
};

export type SignInProps = SignInActions & SignInState;

const SignIn: FC<SignInProps> = ({ onSubmit, isLoading }) => {
  const inputRenderer = useCallback((InputComponent, name) => {
    return (
      <FastField name={name}>
        {({ field, meta }) => {
          return (
            <InputComponent
              {...field}
              name={name}
              explanation={meta.touched && meta.error}
              color={meta.error && meta.touched ? 'danger' : ''}
            />
          );
        }}
      </FastField>
    );
  }, []);

  const signInFormInitialValues = useMemo(
    () => ({
      username: '',
      password: ''
    }),
    []
  );

  if (isLoading) return <Spinner />;
  else
    return (
      <Formik initialValues={signInFormInitialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
        {() => (
          <Form noValidate>
            <SignInComponent
              usernameInputLabel='username'
              passwordInputLabel='password'
              title='Sign In'
              subtitle='Login to manage your account'
              buttonText='Login'
              renderInputs={inputRenderer}
            />
          </Form>
        )}
      </Formik>
    );
};

export default SignIn;
