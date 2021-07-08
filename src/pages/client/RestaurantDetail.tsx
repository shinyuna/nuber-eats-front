import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { getRestaurant, getRestaurantVariables } from '../../api-types/getRestaurant';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { NoData } from '../../components/NoData';
import { Menu } from '../../components/Menu';

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
  const { loading, data } = useQuery<getRestaurant, getRestaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  console.log("🚀 ~ RestaurantDetail ~ data", data);

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
        {data?.getRestaurant.restaurant?.menu.length === 0 && (
          <NoData emoji={'🍽'} title={'You have no menu.'} sub={'Try adding a menu.'} />
        )}
        <div className="grid grid-cols-3 gap-10 sm:grid-cols-1 md:grid-cols-2">
          {!loading &&
            data?.getRestaurant.restaurant?.menu.map(menu => (
              <Menu
                key={menu.name}
                name={menu.name}
                description={menu.description}
                price={menu.price}
                photo={menu.photo}
                isCustomer={true}
              />
            ))}
        </div>
      </div>
    </main>
  );
};
