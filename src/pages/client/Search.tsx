import React, { useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router';
import { findRestaurantByCategory, findRestaurantByCategoryVariables } from '../../api-types/findRestaurantByCategory';
import { findRestaurantByName, findRestaurantByNameVariables } from '../../api-types/findRestaurantByName';
import { HelmetTitle } from '../../components/HelmetTitle';
import { Restaurant } from '../../components/Restaurant';
import { RESTAURANT_FRAGMENT } from '../../fragments';

const FIND_NAME_RESTAURANT_QUERY = gql`
  query findRestaurantByName($input: FindRestaurantInput!) {
    findRestaurantByName(input: $input) {
      ok
      error
      totalPages
      totalCount
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const FIND_CATEGORY_RESTAURANT_QUERY = gql`
  query findRestaurantByCategory($input: FindRestaurantByCategoryInput!) {
    findRestaurantByCategory(input: $input) {
      ok
      error
      totalPages
      totalCount
      category {
        name
      }
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search: React.VFC = () => {
  const location = useLocation();
  const history = useHistory();
  const [type, queryKeyword] = location.search.split('=');
  const [callSearchNameQuery, { data: nameData }] = useLazyQuery<findRestaurantByName, findRestaurantByNameVariables>(
    FIND_NAME_RESTAURANT_QUERY
  );
  const [callSearchCategoryQuery, { data: categoryData }] = useLazyQuery<
    findRestaurantByCategory,
    findRestaurantByCategoryVariables
  >(FIND_CATEGORY_RESTAURANT_QUERY);
  const data = nameData?.findRestaurantByName || categoryData?.findRestaurantByCategory;

  useEffect(() => {
    const [, searchType] = type.split('?');
    const state = location.state;

    if (!searchType || !queryKeyword || !state) return history.replace('/');
    if (searchType === 'term') {
      callSearchNameQuery({
        variables: {
          input: {
            page: 1,
            limit: 4,
            query: queryKeyword,
          },
        },
      });
    } else if (searchType === 'category' && state) {
      callSearchCategoryQuery({
        variables: {
          input: {
            page: 1,
            limit: 4,
            slug: state + '',
          },
        },
      });
    }
  }, [callSearchCategoryQuery, callSearchNameQuery, history, location, queryKeyword, type]);
  return (
    <main className="flex px-10 mt-6 sm:px-5 sm:flex-col">
      <HelmetTitle title={'Search | Nuber Eats'} />
      <div className="w-1/5 sm:mb-5 sm:w-full">
        <h2 className="text-xl font-semibold">"{decodeURI(queryKeyword)}"</h2>
        <p className="mt-2 text-sm font-light">{data?.totalCount}+ Restaurants</p>
      </div>
      <div className="grid w-4/5 grid-cols-3 gap-5 sm:w-full md:grid-cols-2 sm:grid-cols-1">
        {data?.restaurants?.map(restaurant => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            coverImage={restaurant.coverImage}
            categoryName={restaurant.category?.name}
          />
        ))}
      </div>
    </main>
  );
};
