/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryBySlugInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantByCategory
// ====================================================

export interface searchRestaurantByCategory_searchRestaurantByCategory_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantByCategory_searchRestaurantByCategory_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantByCategory_searchRestaurantByCategory_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: searchRestaurantByCategory_searchRestaurantByCategory_restaurants_category | null;
}

export interface searchRestaurantByCategory_searchRestaurantByCategory {
  __typename: "CategoryBySlugOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  category: searchRestaurantByCategory_searchRestaurantByCategory_category | null;
  restaurants: searchRestaurantByCategory_searchRestaurantByCategory_restaurants[] | null;
}

export interface searchRestaurantByCategory {
  searchRestaurantByCategory: searchRestaurantByCategory_searchRestaurantByCategory;
}

export interface searchRestaurantByCategoryVariables {
  input: CategoryBySlugInput;
}
