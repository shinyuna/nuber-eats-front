/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindRestaurantByCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRestaurantByCategory
// ====================================================

export interface findRestaurantByCategory_findRestaurantByCategory_category {
  __typename: "Category";
  name: string;
}

export interface findRestaurantByCategory_findRestaurantByCategory_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface findRestaurantByCategory_findRestaurantByCategory_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: findRestaurantByCategory_findRestaurantByCategory_restaurants_category | null;
}

export interface findRestaurantByCategory_findRestaurantByCategory {
  __typename: "FindRestaurantByCategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  category: findRestaurantByCategory_findRestaurantByCategory_category | null;
  restaurants: findRestaurantByCategory_findRestaurantByCategory_restaurants[] | null;
}

export interface findRestaurantByCategory {
  findRestaurantByCategory: findRestaurantByCategory_findRestaurantByCategory;
}

export interface findRestaurantByCategoryVariables {
  input: FindRestaurantByCategoryInput;
}
