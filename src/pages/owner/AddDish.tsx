import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router';
import { createDish, createDishVariables } from '../../api-types/createDish';
import { useForm } from 'react-hook-form';
import { HelmetTitle } from '../../components/HelmetTitle';
import { FormButton } from '../../components/FormButton';
import { FormError } from '../../components/FormError';
import { MY_RESTAURANT_QUERY } from './MyRestaurant';

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface IForm {
  name: string;
  description: string;
  price: number;
  photo: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [createDish, { data }] = useMutation<createDish, createDishVariables>(CREATE_DISH_MUTATION, {
    refetchQueries: [{ query: MY_RESTAURANT_QUERY, variables: { input: { id: +restaurantId } } }],
  });
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
  });
  const onSubmit = useCallback(() => {
    const { name, description, price, photo } = getValues();
    createDish({
      variables: {
        input: {
          name,
          description,
          price: +price,
          photo,
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack();
  }, []);
  return (
    <main className="px-5 md:px-10">
      <HelmetTitle title={'Create Dish | Nuber Eats'} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-screen-sm gap-3 mx-auto mt-10">
        <h1 className="my-5 text-3xl font-semibold">Add Menu</h1>
        <input
          className="input"
          name="name"
          type="text"
          ref={register({
            required: 'Name is required.',
          })}
          placeholder="Dish Name"
        />
        <input
          className="input"
          name="description"
          type="text"
          ref={register({
            required: 'Description is required.',
          })}
          placeholder="Dish Description"
        />
        <input
          className="input"
          name="price"
          type="number"
          ref={register({
            min: 0,
            required: 'Price is required.',
          })}
          placeholder="Dish Price"
        />
        <div className="grid w-full grid-cols-3 p-0 input">
          <input
            id="menu_image"
            className="hidden"
            type="file"
            name="file"
            ref={register({
              required: true,
            })}
            // onChange={}
          />
          <input
            readOnly
            className="col-start-1 col-end-3 px-4 focus:outline-none"
            type="text"
            name="fileName"
            ref={register()}
            placeholder="Dish Photo"
          />
          <label className="text-sm button bg-lime-500" htmlFor="menu_image">
            Upload Image File
          </label>
        </div>
        <h5>Dish Options</h5>
        <FormButton actionText={'Create Dish'} isLoading={false} isValid={formState.isValid} />
        {data?.createDish.error && <FormError errMsg={data?.createDish.error} />}
      </form>
    </main>
  );
};
