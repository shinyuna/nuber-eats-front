import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { getRestaurant, getRestaurantVariables } from '../../api-types/getRestaurant';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { NoData } from '../../components/NoData';
import { Menu } from '../../components/Menu';
import { DishParts } from '../../api-types/DishParts';

import OrderScreen from '../../components/OrderScreen';
import RestaurantBanner from '../../components/RestaurantBanner';

const RESTAURANT_QUERY = gql`
  query getRestaurant($input: RestaurantInput!) {
    getRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const RestaurantDetail = () => {
  const params = useParams<IRestaurantParams>();

  const [orderVisible, setOrderVisible] = useState<boolean>(false);
  const [peekMenu, setPeekMenu] = useState<DishParts>();

  const { loading, data } = useQuery<getRestaurant, getRestaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });

  const openOrderScreen = (menu: DishParts) => {
    setOrderVisible(true);
    setPeekMenu(menu);
  };

  console.log('🚀 ~ RestaurantDetail ~ data', data);

  return (
    <main>
      <RestaurantBanner
        coverImage={data?.getRestaurant.restaurant?.coverImage!}
        name={data?.getRestaurant.restaurant?.name!}
        category={data?.getRestaurant.restaurant?.category?.name!}
        address={data?.getRestaurant.restaurant?.address!}
      />
      <div className="px-10 py-6 sm:px-5">
        <h4 className="mb-5 text-xl font-medium">{data?.getRestaurant.restaurant?.name} Menu</h4>
        {data?.getRestaurant.restaurant?.menu.length === 0 ? (
          <NoData emoji={'🍽'} title={'You have no menu.'} sub={'Try adding a menu.'} />
        ) : (
          <div>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-1 md:grid-cols-2">
              {!loading &&
                data?.getRestaurant.restaurant?.menu.map(menu => (
                  <Menu key={menu.name} menu={menu} isCustomer={true} makeOrder={() => openOrderScreen(menu)} />
                ))}
            </div>
            <OrderScreen visible={orderVisible} menu={peekMenu!} onClose={() => setOrderVisible(false)} />
          </div>
        )}
      </div>
    </main>
  );
};
