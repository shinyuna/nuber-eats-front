/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantByName
// ====================================================

export interface searchRestaurantByName_searchRestaurantByName_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantByName_searchRestaurantByName_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: searchRestaurantByName_searchRestaurantByName_restaurants_category | null;
}

export interface searchRestaurantByName_searchRestaurantByName {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  restaurants: searchRestaurantByName_searchRestaurantByName_restaurants[] | null;
}

export interface searchRestaurantByName {
  searchRestaurantByName: searchRestaurantByName_searchRestaurantByName;
}

export interface searchRestaurantByNameVariables {
  input: SearchRestaurantInput;
}
