import { useCallback, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { createDish, createDishVariables } from '../../api-types/createDish';
import { MY_RESTAURANT_QUERY } from './MyRestaurant';
import { HelmetTitle } from '../../components/HelmetTitle';
import { useMe } from '../../hooks/useMe';
import { s3ImageUpload } from '../../utils';
import { OptionData } from '../../components/Modal/OptionSettings';
import MenuInfo, { MenuInfoRef } from '../../components/AddDish/MenuInfo';
import MenuOption, { MenuOptionRef } from '../../components/AddDish/MenuOption';
import MenuCheck from '../../components/AddDish/MenuCheck';
import StepFormControl from '../../components/StepFormControl';
import useControlStep from '../../hooks/useControlStep';

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
  const { currentStep, setCurrentStep, error, setError } = useControlStep();

  const [menuData, setMenuData] = useState<MenuData>();

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
    if (currentStep >= 3) {
      return;
    }
    const message = childRef.current?.sendData();
    if (message) {
      return setError(message);
    }
    setError('');
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep === 1) {
      return;
    }
    childRef.current?.sendData();
    setCurrentStep(prev => prev - 1);
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
    <main className="max-w-3xl px-10 m-auto mb-10 sm:px-5">
      <HelmetTitle title={'Create Dish | Nuber Eats'} />
      {currentStep === 1 && <MenuInfo ref={childRef} tempData={menuData} saveData={saveData} />}
      {currentStep === 2 && <MenuOption ref={childRef} saveData={saveData} tempData={menuData} />}
      {currentStep === 3 && <MenuCheck menuData={menuData!} />}
      <StepFormControl
        step={currentStep}
        lastStep={3}
        error={data?.createDish.error || error}
        loading={loading}
        actionTitle="메뉴 등록"
        prevStep={prevStep}
        nextStep={nextStep}
        onAction={onSubmit}
      />
    </main>
  );
};
