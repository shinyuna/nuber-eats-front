import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { FormError } from '../../components/FormError';
import { CreateAccountMutation, CreateAccountMutationVariables } from '../../api-types/CreateAccountMutation';
import { UserRole } from '../../api-types/globalTypes';
import { UberLogo } from '../../components/UberLogo';
import { FormButton } from '../../components/FormButton';
import { HelmetTitle } from '../../components/HelmetTitle';
import { EMAIL_REGEX } from '../../constants';

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

export const CreateAccount: React.VFC = () => {
  const history = useHistory();

  const { register, getValues, errors, handleSubmit, formState } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      // redirect login page
      alert('Account Created! Log in now!😍');
      history.push('/');
    }
  };

  const [createAccountMutation, { loading, data: createAccountMutationResult }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    const { email, password, role } = getValues();
    if (!loading) {
      createAccountMutation({
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
      <HelmetTitle title={'Create Account | Nuber'} />
      <div className="w-full lg:w-4/12 md:w-4/6">
        <UberLogo logoSize="w-48 m-auto my-16" />
        <div className="w-full px-5 m-auto">
          <h3 className="text-3xl text-gray-900">Let's get started</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 mt-4 ">
            {errors.email?.message && <FormError errMsg={errors.email?.message} />}
            {errors.email?.type === 'pattern' && <FormError errMsg={'Please enter a valid email'} />}
            <input
              ref={register({
                required: 'Email is requierd',
                pattern: EMAIL_REGEX,
              })}
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              className="input"
            />
            {errors.password?.message && <FormError errMsg={errors.password?.message} />}
            <input
              ref={register({ required: 'Password is requierd' })}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              className="input"
            />
            <select ref={register({ required: true })} name="role" className="input">
              {Object.keys(UserRole).map((role, index) => (
                <option value={role} key={index}>
                  {role}
                </option>
              ))}
            </select>
            {createAccountMutationResult?.createAccount.error && (
              <FormError errMsg={createAccountMutationResult.createAccount.error} location="center" />
            )}
            <FormButton actionText={'Sign Up'} isLoading={loading} isValid={formState.isValid} />
            <p className="mt-4 text-center">
              Already use Uber?{' '}
              <Link to="/" className="text-uber hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
