import React, { useCallback, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { getRestaurantsQuery, getRestaurantsQueryVariables } from '../../api-types/getRestaurantsQuery';
import { HelmetTitle } from '../../components/HelmetTitle';
import eventBanner from '../../assets/images/banner.png';
import { Restaurant } from '../../components/Restaurant';
import { Category } from '../../components/Category';
import { useHistory } from 'react-router';

const GET_RESTAURANTS_QUERT = gql`
  query getRestaurantsQuery($input: GetRestaurantsInput!) {
    getCategories {
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
    getRestaurants(input: $input) {
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

export const Feed: React.VFC = () => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { data, loading, error } = useQuery<getRestaurantsQuery, getRestaurantsQueryVariables>(GET_RESTAURANTS_QUERT, {
    variables: {
      input: {
        page: page,
        limit: 4,
      },
    },
  });
  const onNextPage = useCallback(() => {
    setPage(cur => cur + 1);
  }, []);
  const onPrevPage = useCallback(() => {
    setPage(cur => cur - 1);
  }, []);
  const onCategorySearch = useCallback(
    e => {
      let category, slug;
      if (e.target.nodeName === 'LI') {
        category = e.target.children[1].innerText;
        slug = e.target.id;
      }
      if (e.target.nodeName === 'DIV') {
        category = e.target.nextSibling.innerText;
        slug = e.target.parentNode.id;
      }
      if (e.target.nodeName === 'P') {
        category = e.target.innerText;
        slug = e.target.parentNode.id;
      }
      category &&
        history.push({
          pathname: '/search',
          search: `category=${category}`,
          state: slug,
        });
    },
    [history]
  );
  return (
    <main className="min-w-screen-large">
      <HelmetTitle title={'Order Food Online | Nuber Eats'} />
      <section className="flex items-center justify-between px-10 py-6 bg-gray-900 min-w-max">
        <div className="w-1/3 text-white">
          <h1 className="mb-2 text-4xl">Crave it? Get it.</h1>
          <p className="font-extralight">Search for a favorite restaurant, cuisine, or dish.</p>
        </div>
        <div className="flex justify-center w-2/3">
          <div className="flex w-1/2">
            <div className="flex flex-col justify-between w-3/5 p-5 bg-yellow-400">
              <p className="text-xl font-semibold break-words">Unlimited $0 delivery fee + 5% off with Eats Pass</p>
              <button className="px-4 py-2 text-sm text-white bg-gray-900 rounded-full">Try 1 month free →</button>
            </div>
            <img className="w-2/5" src={eventBanner} alt="event banner" />
          </div>
        </div>
      </section>
      <section className="py-5 mx-10 border-b">
        <ul className="flex justify-around max-w-xl mx-auto sm:bg-scroll" onClick={onCategorySearch}>
          {data?.getCategories.categories?.map(category => (
            <Category key={category.id} slug={category.slug} name={category.name} coverImage={category.coverImage} />
          ))}
        </ul>
      </section>
      <section className="grid grid-cols-4 gap-5 px-10 mt-10 md:grid-cols-3 sm:grid-cols-1">
        {data?.getRestaurants.result?.map(restaurant => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            coverImage={restaurant.coverImage}
            categoryName={restaurant.category?.name}
          />
        ))}
      </section>
      <div className="flex justify-center my-10">
        {page > 1 && (
          <button onClick={onPrevPage} className="text-xl font-medium">
            &larr;
          </button>
        )}
        <span>
          Page {page} of {data?.getRestaurants.totalPages}
        </span>
        {page !== data?.getRestaurants.totalPages && (
          <button onClick={onNextPage} className="text-xl font-medium">
            &rarr;
          </button>
        )}
      </div>
    </main>
  );
};
