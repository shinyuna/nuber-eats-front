import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { getRestaurant, getRestaurantVariables } from '../../api-types/getRestaurant';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { NoData } from '../../components/NoData';
import { Menu } from '../../components/Menu';
import { DishParts } from '../../api-types/DishParts';

import OrderScreen from '../../components/OrderScreen';

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

  const openOrderScreen = (menu: DishParts) => {
    setOrderVisible(true);
    setPeekMenu(menu);
  };

  const { loading, data } = useQuery<getRestaurant, getRestaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });

  return (
    <main>
      <div
        className="relative py-48 bg-gray-200 bg-center bg-cover "
        style={{
          backgroundImage: `url(${data?.getRestaurant.restaurant?.coverImage})`,
        }}
      >
        <div
          className="absolute bottom-0 left-0 flex items-end w-full h-1/2"
          style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0) 100%)` }}
        >
          <div className="px-10 py-6 text-white">
            <div>
              <h4 className="page-h4">{data?.getRestaurant.restaurant?.name}</h4>
              <h5 className="mb-1 text-sm">{data?.getRestaurant.restaurant?.category?.name}</h5>
              <p className="text-sm">
                {data?.getRestaurant.restaurant?.address} • <button className="font-medium underline">More info</button>
              </p>
            </div>
          </div>
        </div>
      </div>
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
