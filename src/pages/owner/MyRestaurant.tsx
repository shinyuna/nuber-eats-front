import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { getRestaurantByOwner } from '../../api-types/getRestaurantByOwner';
import { HelmetTitle } from '../../components/HelmetTitle';
import { RESTAURANT_FRAGMENT } from '../../fragments';

const MY_RESTAURANT_QUERY = gql`
  query getRestaurantByOwner {
    getRestaurantByOwner {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurant: React.VFC = () => {
  const { loading, data } = useQuery<getRestaurantByOwner>(MY_RESTAURANT_QUERY);
  console.log('🚀 ~ MyRestaurant ~ data', data);
  return (
    <main className="p-10 md:min-w-screen-large">
      <HelmetTitle title={'My Restaurants | Nuber Eats'} />
      <div className="">
        {data?.getRestaurantByOwner.ok && data.getRestaurantByOwner.restaurants.length === 0 ? (
          ''
        ) : (
          <div className="max-w-md mx-auto mt-40 text-center">
            <p className="text-8xl">🍔🍟</p>
            <h4 className="mt-10 text-4xl">You have no restaurants.</h4>
            <p className="my-5 text-lg font-light">Try creating a restaurant.</p>
            <Link to="/add-restaurant" className="block w-full p-4 text-white bg-lime-600">
              Let’s make a restaurant now &rarr;
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
