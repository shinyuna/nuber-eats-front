import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { allRestaurantQuery, allRestaurantQueryVariables } from '../../api-types/allRestaurantQuery';
import { HelmetTitle } from '../../components/HelmetTitle';
import eventBanner from '../../assets/images/banner.png';
import { url } from 'node:inspector';
import { Categories } from '../../components/Categories';

const All_RESTAURANT_QUERT = gql`
  query allRestaurantQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        slug
        coverImage
        restaurantCount
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalCount
      result {
        id
        name
        coverImage
        isPromoted
        category {
          name
        }
      }
    }
  }
`;

export const Restaurant = () => {
  const { data, loading, error } = useQuery<allRestaurantQuery, allRestaurantQueryVariables>(All_RESTAURANT_QUERT, {
    variables: {
      input: {
        page: 1,
        limit: 10,
      },
    },
  });
  console.log('🚀 ~ Restaurant ~ data', data);
  return (
    <main className="min-w-screen-large">
      <HelmetTitle title={'Order Food Online | Nuber Eats'} />
      <section className="flex items-center justify-between px-10 py-10 bg-gray-900 h-72">
        <div className="text-white">
          <h1 className="mb-2 text-4xl">Crave it? Get it.</h1>
          <p className="font-extralight">Search for a favorite restaurant, cuisine, or dish.</p>
        </div>
        <div className="flex w-1/3 h-full">
          <div className="flex flex-col justify-between w-6/12 p-5 bg-yellow-400">
            <p className="text-xl font-semibold break-words">Unlimited $0 delivery fee + 5% off with Eats Pass</p>
            <button className="px-4 py-2 text-sm text-white bg-gray-900 rounded-full">Try 1 month free →</button>
          </div>
          <img className="h-full" src={eventBanner} alt="event banner" />
        </div>
      </section>
      <section className="py-5 mx-10 border-b">
        {data?.allCategories.categories && <Categories categories={data?.allCategories.categories} />}
      </section>
      <section className="grid grid-cols-3 gap-5 px-10 mt-10">
        {data?.allRestaurants.result?.map(restaurant => (
          <article>
            <div
              className="py-20 mb-2 bg-gray-200 bg-center bg-cover"
              style={{ backgroundImage: `url(${restaurant.coverImage})` }}
            ></div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{restaurant.name}</h3>
              <p className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded-full">{restaurant.category?.name}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};
