import { authActions } from '@/adapter/redux/actions';
import { selectLoginLoading } from '@/adapter/redux/selectors';
import { ReduxStore } from '@/adapter/redux/types';
import { loginValidationSchema } from '@/validators/loginValidations';
// @ts-ignore
import { SignIn } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../spiner';
import { LoginViewModel } from './../../models/LoginViewModel';

type AuthActions = {
  onSubmit: (loginViewModel: LoginViewModel) => void;
};

type AuthState = {
  isLoading: boolean;
};

type AuthContainerProps = AuthState & AuthActions;

const SignInContainer: FC<AuthContainerProps> = ({ onSubmit, isLoading }) => {
  const handleSubmit = useCallback((values: LoginViewModel) => {
    setTimeout(() => {
      const response = {
        data: {
          status: Math.floor(Math.random() * 5 + 200),
          statusCode: 501,
          id: 1067
        }
      };
    }, 2000);

    onSubmit(values);
  }, []);

  const inputRenderer = useCallback((InputComponent, name) => {
    return (
      <FastField name={name}>
        {({ field, meta }) => {
          console.log(field);
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

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}>
        {({ values }) => (
          <Form noValidate>
            <SignIn
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
  }
};

export default connect<AuthState, AuthActions>(
  (state: ReduxStore) => ({
    isLoading: selectLoginLoading(state)
  }),
  {
    onSubmit: authActions.loginRequest
  }
)(SignInContainer);
