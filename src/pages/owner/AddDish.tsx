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
import { s3ImageUpload } from '../../utils';
import { OptionData } from '../../components/Modal/OptionSettings';
import MenuInfo, { MenuInfoRef } from '../../components/AddDish/MenuInfo';
import MenuOption, { MenuOptionRef } from '../../components/AddDish/MenuOption';
import MenuCheck from '../../components/AddDish/MenuCheck';

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
  file: FileList;
  fileName: string;
  options: OptionData[];
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
  console.log('🚀 ~ AddDish ~ menuData', menuData);
  const [currStep, setCurrStep] = useState<number>(1);
  const [error, setError] = useState<string>('');

  const [createDish, { data, loading }] = useMutation<createDish, createDishVariables>(CREATE_DISH_MUTATION, {
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

  const childRef = useRef<MenuInfoRef | MenuOptionRef>(null);

  const saveData = (data: any) => {
    setMenuData(prev => {
      return { ...prev, ...data };
    });
  };

  const nextStep = () => {
    if (currStep >= 3) {
      return;
    }
    const message = childRef.current?.sendData();
    if (message) {
      return setError(message);
    }
    setError('');
    setCurrStep(prev => prev + 1);
  };
  const prevStep = () => {
    if (currStep === 1) {
      return;
    }
    childRef.current?.sendData();
    setCurrStep(prev => prev - 1);
  };

  const onSubmit = useCallback(async () => {
    try {
      const photo = await s3ImageUpload(
        menuData!.file,
        userData?.me.id + '',
        `${restaurantId}_dish_${menuData?.name}_img`
      );
      const options = menuData?.options.map(option => {
        const { id, ...rest } = option;
        return rest;
      });
      createDish({
        variables: {
          input: {
            name: menuData!.name,
            description: menuData!.description,
            price: +menuData!.price,
            photo: photo,
            restaurantId: +restaurantId,
            options: options,
          },
        },
      });
      history.goBack();
    } catch (error) {
      console.error(error);
    }
  }, [createDish, history, menuData, restaurantId, userData?.me.id]);

  return (
    <main className="max-w-3xl px-10 m-auto sm:px-5">
      <HelmetTitle title={'Create Dish | Nuber Eats'} />
      {currStep === 1 && <MenuInfo ref={childRef} tempData={menuData} saveData={saveData} />}
      {currStep === 2 && <MenuOption ref={childRef} saveData={saveData} tempData={menuData} />}
      {currStep === 3 && <MenuCheck menuData={menuData!} />}

      <div className="mt-10 text-right">
        {data?.createDish.error || (error && <FormError errMsg={data?.createDish.error || error} />)}
        {currStep > 1 && (
          <button className="p-4 mr-4 text-lime-500" onClick={prevStep}>
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            이전
          </button>
        )}
        {currStep < 3 && (
          <button className="button" onClick={nextStep}>
            다음
          </button>
        )}
        {currStep === 3 && (
          <FormButton actionText={'메뉴 등록'} isLoading={loading} isValid={true} onClick={onSubmit} />
        )}
      </div>
    </main>
  );
};
