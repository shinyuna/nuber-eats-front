import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import {
  searchRestaurantByCategory,
  searchRestaurantByCategoryVariables,
} from '../../api-types/searchRestaurantByCategory';
import { searchRestaurantByName, searchRestaurantByNameVariables } from '../../api-types/searchRestaurantByName';
import { HelmetTitle } from '../../components/HelmetTitle';
import { RESTAURANT_FRAGMENT } from '../../fragments';

const SEARCH_NAME_RESTAURANT_QUERY = gql`
  query searchRestaurantByName($input: SearchRestaurantInput!) {
    searchRestaurantByName(input: $input) {
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

const SEARCH_CATEGORY_RESTAURANT_QUERY = gql`
  query searchRestaurantByCategory($input: CategoryBySlugInput!) {
    searchRestaurantByCategory(input: $input) {
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

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callSearchNameQuery, { loading: nameLoading, data: nameData }] = useLazyQuery<
    searchRestaurantByName,
    searchRestaurantByNameVariables
  >(SEARCH_NAME_RESTAURANT_QUERY);
  const [callSearchCategoryQuery, { loading: categoryLoading, data: categoryData }] = useLazyQuery<
    searchRestaurantByCategory,
    searchRestaurantByCategoryVariables
  >(SEARCH_CATEGORY_RESTAURANT_QUERY);

  useEffect(() => {
    const [type, searchContent] = location.search.split('=');
    const [_, searchType] = type.split('?');
    const state = location.state;

    if (!searchType || !searchContent) return history.replace('/');
    if (searchType === 'term') {
      callSearchNameQuery({
        variables: {
          input: {
            page: 1,
            limit: 4,
            query: searchContent,
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
  }, [history, location]);
  return (
    <div>
      <HelmetTitle title={'Search | Nuber Eats'} />
    </div>
  );
};
