import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormButton } from '../../components/FormButton';
import { useMe } from '../../hooks/useMe';
import { editProfile, editProfileVariables } from '../../api-types/editProfile';
import { client } from '../../apollo';
import { HelmetTitle } from '../../components/HelmetTitle';

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile: React.VFC = () => {
  const { data: userData } = useMe();
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: 'onChange',
    defaultValues: {
      email: userData?.me.email,
      password: '',
    },
  });
  const onCompleted = useCallback((data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        // front에서 직접 cache를 핸들링
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditUser on User {
              verify
              email
            }
          `,
          data: {
            email: newEmail,
            verify: false,
          },
        });
      }
      // update cache
    }
  }, []);
  const [editProfile, { data, loading }] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const onSubmit = useCallback(() => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }),
        },
      },
    });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-52">
      <HelmetTitle title={'Edit Profile | Nuber Eats'} />
      <h4 className="text-2xl">Edit Profile</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-2 mt-4 lg:w-4/12 md:w-4/6">
        <input
          ref={register({
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          type="email"
          placeholder="Email"
          className="input"
        />
        <input ref={register} name="password" type="password" placeholder="Password" className="input" />
        <FormButton actionText={'Update Profile'} isValid={formState.isValid} isLoading={loading} />
      </form>
    </div>
  );
};
