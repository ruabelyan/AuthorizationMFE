import { authActions } from '@/adapter/redux/actions';
import { LoginRequestModel } from '@/domain/types';
import { loginValidationSchema } from '@/validators/loginValidations';
// @ts-ignore
import { SignIn } from '@atom/design-system';
import { FastField, Form, Formik } from 'formik';
import { FC, useCallback } from 'react';
import { connect } from 'react-redux';
type AuthActions = {
  onSubmit: (loginRequestModel: LoginRequestModel) => void;
};

type AuthContainerProps = {} & AuthActions;

const SignInContainer: FC<AuthContainerProps> = ({ onSubmit }) => {
  const handleSubmit = useCallback((values: LoginRequestModel) => {
    onSubmit(values);
  }, []);

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

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}>
      {() => (
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
};

export default connect<null, AuthActions>(null, {
  onSubmit: authActions.loginRequest
})(SignInContainer);
