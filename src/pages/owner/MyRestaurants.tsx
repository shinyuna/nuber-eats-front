import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { getRestaurantsByOwner } from '../../api-types/getRestaurantsByOwner';
import { HelmetTitle } from '../../components/HelmetTitle';
import { NoData } from '../../components/NoData';
import { Restaurant } from '../../components/Restaurant';
import { RESTAURANT_FRAGMENT } from '../../fragments';

export const MY_RESTAURANTS_QUERY = gql`
  query getRestaurantsByOwner {
    getRestaurantsByOwner {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants: React.VFC = () => {
  const { data } = useQuery<getRestaurantsByOwner>(MY_RESTAURANTS_QUERY);

  return (
    <main className="px-10 sm:px-5">
      <h1 className="my-5 text-3xl font-semibold">My Restaurants</h1>
      <HelmetTitle title={'My Restaurants | Nuber Eats'} />
      {data?.getRestaurantsByOwner.ok && data.getRestaurantsByOwner.restaurants.length === 0 ? (
        <NoData
          emoji={'🍔🍟'}
          title="You have no restaurants."
          sub="Try creating a restaurant."
          link="/add-restaurant"
          button="Let’s make a restaurant now"
        />
      ) : (
        <div className="grid grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1">
          {data?.getRestaurantsByOwner.restaurants?.map(restaurant => (
            <Restaurant
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              coverImage={restaurant.coverImage}
              categoryName={restaurant.category?.name}
            />
          ))}
        </div>
      )}
    </main>
  );
};
