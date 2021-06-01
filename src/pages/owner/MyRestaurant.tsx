import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { getRestaurantByOwner, getRestaurantByOwnerVariables } from '../../api-types/getRestaurantByOwner';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { NoData } from '../../components/NoData';
import { Link } from 'react-router-dom';

export const MY_RESTAURANT_QUERY = gql`
  query getRestaurantByOwner($input: RestaurantInput!) {
    getRestaurantByOwner(input: $input) {
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
interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data, loading } = useQuery<getRestaurantByOwner, getRestaurantByOwnerVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +id,
      },
    },
  });
  return (
    <main>
      <div
        className="relative bg-gray-200 bg-center bg-cover py-36 "
        style={{
          backgroundImage: `url(${data?.getRestaurantByOwner.restaurant?.coverImage})`,
        }}
      >
        <div
          className="absolute bottom-0 left-0 flex items-end w-full h-1/2"
          style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0) 100%)` }}
        >
          <div className="px-10 py-6 text-white sm:px-5">
            <div>
              <h4 className="page-h4">{data?.getRestaurantByOwner.restaurant?.name}</h4>
              <h5 className="mb-1 text-sm">{data?.getRestaurantByOwner.restaurant?.category?.name}</h5>
              <p className="text-sm">
                {data?.getRestaurantByOwner.restaurant?.address} •{' '}
                <button className="font-medium underline focus:outline-none">More info</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 sm:px-5">
        <div className="py-8">
          <Link to={`/restaurant/${id}/add-dish`} className="inline-block mr-4 bg-gray-800 rounded-full button">
            Add Dish &rarr;
          </Link>
          <button className="rounded-full button">Buy Promotion &rarr;</button>
        </div>
        <h4 className="mb-5 text-xl">{data?.getRestaurantByOwner.restaurant?.name} Menu</h4>
        <div>
          {data?.getRestaurantByOwner.restaurant?.menu.length === 0 && (
            <NoData emoji={'🍽'} title={'You have no menu.'} sub={'Try adding a menu.'} />
          )}
          <div className="grid grid-cols-3 gap-10 sm:grid-cols-1 md:grid-cols-2">
            {!loading &&
              data?.getRestaurantByOwner.restaurant?.menu.map(menu => (
                <div className="flex">
                  <div className="flex flex-col justify-between flex-1 p-6 border border-gray-200">
                    <p className="text-lg font-medium tracking-wide">{menu.name}</p>
                    <p>{menu.price} &#8361;</p>
                  </div>
                  <div className="flex-1 flex-shrink h-40 bg-gray-200">
                    <img className="object-cover w-full h-full" src={menu.photo} alt={menu.name} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};
