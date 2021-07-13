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
import { s3ImageUpload } from '../../utils';
import { useMe } from '../../hooks/useMe';

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
  price: string;
  [key: string]: string;
}

/**
 *
 * @todo 파일 업로더 드래그앤 드롭 해보기!!
 */

export const AddDish = () => {
  const history = useHistory();

  const { data: userData } = useMe();
  const { restaurantId } = useParams<IParams>();
  const [optionsCount, setOptionsCount] = useState<number[]>([]);

  const { register, handleSubmit, formState, getValues, setValue } = useForm<IForm>({
    mode: 'onChange',
  });

  const [createDish, { data }] = useMutation<createDish, createDishVariables>(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            restaurantId: +restaurantId,
          },
        },
      },
    ],
  });

  const onSubmit = useCallback(async () => {
    try {
      const { name, description, price, file, ...rest } = getValues();
      const optionObjects = optionsCount.map(theId => ({
        name: rest[`optionName-${theId}`],
        min: +rest[`optionMin-${theId}`],
        max: +rest[`optionMax-${theId}`],
        isRequired: rest[`optionRequired-${theId}`] === 'true' ? true : false,
      }));
      const photo = await s3ImageUpload(file, userData?.me.id + '', `${restaurantId}_dish_${name}_img`);
      createDish({
        variables: {
          input: {
            name,
            description,
            price: +price,
            photo: photo,
            restaurantId: +restaurantId,
            options: optionObjects,
          },
        },
      });
      history.goBack();
    } catch (error) {
      console.error(error);
    }
  }, [createDish, getValues, history, optionsCount, restaurantId, userData?.me.id]);

  const updateFileName = useCallback(
    e => {
      setValue('fileName', e.target.files[0].name);
    },
    [setValue]
  );

  const addMenuOptions = useCallback(() => {
    const id = Date.now();
    setOptionsCount(current => [...current, id]);
  }, []);

  const deleteMenuOptions = useCallback(
    (removeId: number) => {
      setOptionsCount(current => current.filter(id => id !== removeId));
      setValue(`optionName-${removeId}`, '');
      setValue(`optionRequired-${removeId}`, '');
      setValue(`optionMax-${removeId}`, '');
      setValue(`optionMin-${removeId}`, '');
    },
    [setValue]
  );
  return (
    <main className="px-10 sm:px-5">
      <HelmetTitle title={'Create Dish | Nuber Eats'} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-3xl gap-3 mx-auto">
        <h1 className="my-5 text-3xl font-semibold">메뉴 추가</h1>
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
        <div className="grid w-full grid-cols-4 p-0 sm:grid-cols-3">
          <input
            id="menu_image"
            className="hidden"
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            ref={register}
            onChange={updateFileName}
          />
          <input
            readOnly
            className="col-start-1 col-end-4 px-4 sm:col-end-3 input"
            type="text"
            name="fileName"
            ref={register}
            placeholder="Dish Photo"
          />
          <label className="text-sm button bg-lime-500" htmlFor="menu_image">
            업로드
          </label>
        </div>
        <h2 className="text-xl">
          옵션 메뉴 <span className="text-sm text-gray-400">(선택)</span>
        </h2>
        <button className="text-left text-uber" onClick={addMenuOptions}>
          <FontAwesomeIcon icon={faPlus} className="mr-1" /> 옵션그룹 추가
        </button>
        {optionsCount.length > 0 &&
          optionsCount.map((id, index) => (
            <div key={id}>
              <button
                className="float-right w-8 h-8 text-sm rounded-full text-lime-600 bg-lime-100"
                onClick={() => deleteMenuOptions(id)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="grid w-full gap-6">
                <div>
                  <p className="mb-4 text-base">옵션그룹명</p>
                  <input
                    ref={register({
                      required: 'Option name is required.',
                    })}
                    type="text"
                    name={`optionName-${id}`}
                    className="w-full input"
                    placeholder="Name"
                    autoFocus
                  />
                </div>
                <div>
                  <p className="mb-4 text-base">필수 여부</p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                    <div className="flex items-center justify-between">
                      <input
                        ref={register({
                          required: 'required is required.',
                        })}
                        type="radio"
                        value="true"
                        id="true"
                        name={`optionRequired-${id}`}
                        defaultChecked
                      />
                      <label htmlFor="true" className="text-sm">
                        해당 옵션을 반드시 선택해야 주문 가능
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <input
                        ref={register({
                          required: 'required is required.',
                        })}
                        type="radio"
                        value="false"
                        id="false"
                        name={`optionRequired-${id}`}
                      />
                      <label htmlFor="false" className="text-sm">
                        해당 옵션을 선택하지 않아도 주문 가능
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-base">옵션 선택 수 (최소/최대)</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      ref={register()}
                      type="number"
                      name={`optionMin-${id}`}
                      className="w-full input"
                      min="0"
                      placeholder="Min"
                    />
                    <input
                      ref={register()}
                      type="number"
                      name={`optionMax-${id}`}
                      className="w-full input"
                      min="1"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        <FormButton actionText={'메뉴 생성'} isLoading={false} isValid={formState.isValid} />
        {data?.createDish.error && <FormError errMsg={data?.createDish.error} />}
      </form>
    </main>
  );
};
