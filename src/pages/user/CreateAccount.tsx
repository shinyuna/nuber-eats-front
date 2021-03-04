import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormError } from '../../components/FormError';
import { CreateAccountMutation, CreateAccountMutationVariables } from '../../api-types/CreateAccountMutation';
import { UserRole } from '../../api-types/globalTypes';
import { UberLogo } from '../../components/UberLogo';
import { FormButton } from '../../components/FormButton';

const CREATACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const { register, getValues, errors, handleSubmit, formState } = useForm<ICreateAccountForm>({ mode: 'onChange' });
  const onCompleted = (data: CreateAccountMutation) => {
    if (data.createAccount.ok) {
      const {
        createAccount: { error, ok },
      } = data;
      if (ok) {
        console.log(ok);
      }
    }
  };
  const [loginMutation, { loading, data: createAccountMutationResult }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    const { email, password, role } = getValues();
    if (!loading) {
      loginMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div className="flex justify-center w-full h-screen bg-white">
      {' '}
      <div className="w-4/12 sm:w-full md:w-4/6">
        <UberLogo style={`w-48 m-auto my-16`} />
        <div className="w-full px-5 m-auto">
          <h3 className="text-3xl text-gray-900">Let's Start</h3>
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
            <select name="" id=""></select>
            {createAccountMutationResult?.createAccount.error && (
              <FormError errMsg={createAccountMutationResult.createAccount.error} location="center" />
            )}
            <FormButton actionText={'Sign Up'} isLoading={loading} isValid={formState.isValid} />
            <p className="mt-4 text-center">
              Already use Uber?{' '}
              <Link to="/login" className="text-uber hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
