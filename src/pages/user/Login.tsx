import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormError } from '../../components/FormError';
import { LoginMutation, LoginMutationVariables } from '../../api-types/LoginMutation';
import { UberLogo } from '../../components/UberLogo';
import { FormButton } from '../../components/FormButton';
import { HelmetTitle } from '../../components/Helmet';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({ mode: 'onChange' });
  const onCompleted = (data: LoginMutation) => {
    if (data.login.ok) {
      const {
        login: { error, ok, token },
      } = data;
      if (ok) {
        console.log(token);
      }
    }
  };
  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmit = () => {
    const { email, password } = getValues();
    if (!loading) {
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="flex justify-center w-full h-screen bg-white">
      <HelmetTitle title={'LogIn | Nuber'} />
      <div className="w-4/12 sm:w-full md:w-4/6">
        <UberLogo style={`w-48 m-auto my-16`} />
        <div className="w-full px-5 m-auto">
          <h3 className="text-3xl text-gray-900">Welcome back</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 mt-4 ">
            {errors.email?.message && <FormError errMsg={errors.email?.message} />}
            <input
              ref={register({ required: 'Email is requierd' })}
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              className="p-3 transition-colors border border-gray-200 focus:outline-none focus:border-gray-900"
            />
            {errors.password?.message && <FormError errMsg={errors.password?.message} />}
            <input
              ref={register({ required: 'Password is requierd' })}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              className="p-3 transition-colors border border-gray-200 focus:outline-none focus:border-gray-900"
            />
            {loginMutationResult?.login.error && (
              <FormError errMsg={loginMutationResult.login.error} location="center" />
            )}
            <FormButton actionText={'Log In'} isValid={formState.isValid} isLoading={loading} />
          </form>
          <p className="mt-4 text-center">
            New to Uber?{' '}
            <Link to="/create-account" className="text-uber hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
