import React, { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router';
import { createDish, createDishVariables } from '../../api-types/createDish';
import { useForm } from 'react-hook-form';
import { HelmetTitle } from '../../components/HelmetTitle';
import { FormButton } from '../../components/FormButton';
import { FormError } from '../../components/FormError';
import { MY_RESTAURANT_QUERY } from './MyRestaurant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';

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
  file: FileList;
  fileName: string;
}

/**
 *
 * @todo 파일 업로더 드래그앤 드롭 해보기!!
 */

export const AddDish = () => {
  const [optionsCount, setOptionsCount] = useState(0);
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [createDish, { data }] = useMutation<createDish, createDishVariables>(CREATE_DISH_MUTATION, {
    refetchQueries: [{ query: MY_RESTAURANT_QUERY, variables: { input: { id: +restaurantId } } }],
  });
  const { register, handleSubmit, formState, getValues, setValue } = useForm<IForm>({
    mode: 'onChange',
  });
  const onSubmit = useCallback(() => {
    const { name, description, price } = getValues();
    // GET Photo URI
    createDish({
      variables: {
        input: {
          name,
          description,
          price: +price,
          photo: '',
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack();
  }, []);
  const updateFileName = useCallback(() => {
    const { file } = getValues();
    setValue('fileName', file[0].name);
  }, []);
  const addMenuOptions = useCallback(() => {
    setOptionsCount(prev => prev + 1);
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
          min="0"
          ref={register({
            min: 0,
            required: 'Price is required.',
          })}
          placeholder="Dish Price"
        />
        <div className="grid w-full grid-cols-4 p-0">
          <input
            id="menu_image"
            className="hidden"
            type="file"
            name="file"
            ref={register({
              required: true,
            })}
            onChange={updateFileName}
          />
          <input
            readOnly
            className="col-start-1 col-end-4 px-4 focus:outline-none input"
            type="text"
            name="fileName"
            ref={register()}
            placeholder="Dish Photo"
          />
          <label className="text-sm button bg-lime-500" htmlFor="menu_image">
            Upload File
          </label>
        </div>
        <h2 className="text-xl">
          Menu Option <span className="text-sm text-gray-400">(optional)</span>
        </h2>
        {optionsCount > 0 &&
          Array.from(new Array(optionsCount)).map((_, index) => (
            <div key={index} className="grid w-full gap-3">
              <h3 className="flex justify-between text-sm">
                Option {index + 1}
                <button className="w-5 h-5 bg-red-100 rounded-full focus:outline-none">
                  <FontAwesomeIcon icon={faTimes} className="text-red-400" />
                </button>
              </h3>
              <input
                type="text"
                ref={register({
                  required: 'Name is required.',
                })}
                name={`option-name-${index + 1}`}
                className="input"
                placeholder="Option name"
              />
              <input
                type="number"
                ref={register({
                  min: 0,
                  required: 'Price is required.',
                })}
                name={`option-price-${index + 1}`}
                min="0"
                className="input"
                placeholder="Option price"
              />
            </div>
          ))}
        <button className="text-left text-uber focus:outline-none" onClick={addMenuOptions}>
          <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Option group
        </button>
        <FormButton actionText={'Create Dish'} isLoading={false} isValid={formState.isValid} />
        {data?.createDish.error && <FormError errMsg={data?.createDish.error} />}
      </form>
    </main>
  );
};
