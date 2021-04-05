import { gql, useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { createRestaurant, createRestaurantVariables } from '../../api-types/createRestaurant';
import { FormButton } from '../../components/FormButton';
import { HelmetTitle } from '../../components/HelmetTitle';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}
export const AddRestaurant = () => {
  const [createRestaurant, { loading, data }] = useMutation<createRestaurant, createRestaurantVariables>(
    CREATE_RESTAURANT_MUTATION
  );
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: 'onChange',
  });
  const onSubmit = useCallback(() => {
    console.log(getValues());
  }, []);
  return (
    <main className="container">
      <HelmetTitle title={'Create Restaurant | Nuber Eats'} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-screen-sm gap-3 mx-auto">
        <h1 className="mt-5 mb-10 text-3xl">Add Your Restaurant</h1>
        <input
          className="input"
          name="name"
          type="text"
          ref={register({
            required: 'Name is required.',
          })}
          placeholder="Restaurant Name"
        />
        <input
          className="input"
          name="address"
          type="text"
          ref={register({
            required: 'Address is required.',
          })}
          placeholder="Restaurant Address"
        />
        <input
          className="input"
          name="categoryName"
          type="text"
          ref={register({
            required: 'Category name is required.',
          })}
          placeholder="Restaurant Category"
        />
        <FormButton actionText={'Create Restaurant'} isLoading={false} isValid={true} />
      </form>
    </main>
  );
};
