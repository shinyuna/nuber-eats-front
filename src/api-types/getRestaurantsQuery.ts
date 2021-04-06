/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRestaurantsQuery
// ====================================================

export interface getRestaurantsQuery_getCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  coverImage: string | null;
  restaurantCount: number;
}

export interface getRestaurantsQuery_getCategories {
  __typename: "GetCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: getRestaurantsQuery_getCategories_categories[] | null;
}

export interface getRestaurantsQuery_getRestaurants_result_category {
  __typename: "Category";
  name: string;
}

export interface getRestaurantsQuery_getRestaurants_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  isPromoted: boolean;
  category: getRestaurantsQuery_getRestaurants_result_category | null;
}

export interface getRestaurantsQuery_getRestaurants {
  __typename: "GetRestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  result: getRestaurantsQuery_getRestaurants_result[] | null;
}

export interface getRestaurantsQuery {
  getCategories: getRestaurantsQuery_getCategories;
  getRestaurants: getRestaurantsQuery_getRestaurants;
}

export interface getRestaurantsQueryVariables {
  input: GetRestaurantsInput;
}
