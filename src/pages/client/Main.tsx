import React, { useCallback, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { allRestaurantQuery, allRestaurantQueryVariables } from '../../api-types/allRestaurantQuery';
import { HelmetTitle } from '../../components/HelmetTitle';
import eventBanner from '../../assets/images/banner.png';
import { Restaurant } from '../../components/Restaurant';
import { Category } from '../../components/Category';

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

export const Main = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<allRestaurantQuery, allRestaurantQueryVariables>(All_RESTAURANT_QUERT, {
    variables: {
      input: {
        page: page,
        limit: 4,
      },
    },
  });
  const onNextPage = useCallback(() => {
    setPage(cur => cur + 1);
  }, [page]);
  const onPrevPage = useCallback(() => {
    setPage(cur => cur - 1);
  }, [page]);
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
        <ul className="flex justify-around max-w-sm mx-auto">
          {data?.allCategories.categories?.map(category => (
            <Category key={category.id} name={category.name} coverImage={category.coverImage} />
          ))}
        </ul>
      </section>
      <section className="grid grid-cols-4 gap-5 px-10 mt-10">
        {data?.allRestaurants.result?.map(restaurant => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            coverImage={restaurant.coverImage}
            categoryName={restaurant.category?.name}
          />
        ))}
      </section>
      <div className="flex justify-center mt-10">
        {page > 1 && (
          <button onClick={onPrevPage} className="text-xl font-medium focus:outline-none">
            &larr;
          </button>
        )}
        <span>
          Page {page} of {data?.allRestaurants.totalPages}
        </span>
        {page !== data?.allRestaurants.totalPages && (
          <button onClick={onNextPage} className="text-xl font-medium focus:outline-none">
            &rarr;
          </button>
        )}
      </div>
    </main>
  );
};
