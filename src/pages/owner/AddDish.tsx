import { useCallback, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { createDish, createDishVariables } from '../../api-types/createDish';
import { MY_RESTAURANT_QUERY } from './MyRestaurant';
import { HelmetTitle } from '../../components/HelmetTitle';
import { FormButton } from '../../components/FormButton';
import { FormError } from '../../components/FormError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { useMe } from '../../hooks/useMe';
import MenuInfo, { MenuInfoRef } from '../../components/AddDish/MenuInfo';
import OptionMenu from '../../components/AddDish/OptionMenu';

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

export interface MenuData {
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

  const [menuData, setMenuData] = useState<MenuData>();
  const [currStep, setCurrStep] = useState<number>(1);
  const [optionsCount, setOptionsCount] = useState<number[]>([]);

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

  const childRef = useRef<MenuInfoRef>(null);
  const saveData = (data: any) => {
    setMenuData(prev => {
      return { ...prev, ...data };
    });
  };

  const nextStep = () => {
    if (currStep >= 3) {
      return;
    }
    childRef.current?.sendData();
    setCurrStep(prev => prev + 1);
  };
  const prevStep = () => {
    if (currStep === 1) {
      return;
    }
    setCurrStep(prev => prev - 1);
  };

  const setOptions = (fn: Function) => {
    setOptionsCount(prev => fn(prev));
  };

  // const onSubmit = useCallback(async () => {
  //   try {
  //     const { name, description, price, file, ...rest } = getValues();
  //     const optionObjects = optionsCount.map(theId => ({
  //       name: rest[`optionName-${theId}`],
  //       min: +rest[`optionMin-${theId}`],
  //       max: +rest[`optionMax-${theId}`],
  //       isRequired: rest[`optionRequired-${theId}`] === 'true' ? true : false,
  //     }));
  //     const photo = await s3ImageUpload(file, userData?.me.id + '', `${restaurantId}_dish_${name}_img`);
  //     createDish({
  //       variables: {
  //         input: {
  //           name,
  //           description,
  //           price: +price,
  //           photo: photo,
  //           restaurantId: +restaurantId,
  //           options: optionObjects,
  //         },
  //       },
  //     });
  //     history.goBack();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [createDish, getValues, history, restaurantId, userData?.me.id]);

  return (
    <main className="max-w-3xl px-10 m-auto sm:px-5">
      <HelmetTitle title={'Create Dish | Nuber Eats'} />

      {currStep === 1 && (
        <MenuInfo
          ref={childRef}
          userId={userData?.me.id}
          restaurantId={restaurantId}
          enterData={menuData}
          saveData={saveData}
        />
      )}
      {currStep === 2 && <OptionMenu optionCounts={optionsCount} setOptions={setOptions} />}

      <div className="mt-10 text-right">
        {currStep > 1 && (
          <button className="p-4 mr-4 text-lime-500" onClick={prevStep}>
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            이전
          </button>
        )}
        <button className="button" onClick={nextStep}>
          다음
        </button>
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-3xl gap-3 mx-auto">
        <FormButton actionText={'메뉴 생성'} isLoading={false} isValid={formState.isValid} />
        {data?.createDish.error && <FormError errMsg={data?.createDish.error} />}
      </form> */}
    </main>
  );
};
