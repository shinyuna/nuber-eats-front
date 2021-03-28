/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allRestaurantQuery
// ====================================================

export interface allRestaurantQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  coverImage: string | null;
  restaurantCount: number;
}

export interface allRestaurantQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: allRestaurantQuery_allCategories_categories[] | null;
}

export interface allRestaurantQuery_allRestaurants_result_category {
  __typename: "Category";
  name: string;
}

export interface allRestaurantQuery_allRestaurants_result {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  isPromoted: boolean;
  category: allRestaurantQuery_allRestaurants_result_category | null;
}

export interface allRestaurantQuery_allRestaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  result: allRestaurantQuery_allRestaurants_result[] | null;
}

export interface allRestaurantQuery {
  allCategories: allRestaurantQuery_allCategories;
  allRestaurants: allRestaurantQuery_allRestaurants;
}

export interface allRestaurantQueryVariables {
  input: RestaurantsInput;
}
