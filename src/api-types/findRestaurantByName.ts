/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRestaurantByName
// ====================================================

export interface findRestaurantByName_findRestaurantByName_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface findRestaurantByName_findRestaurantByName_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: findRestaurantByName_findRestaurantByName_restaurants_category | null;
}

export interface findRestaurantByName_findRestaurantByName {
  __typename: "FindRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  restaurants: findRestaurantByName_findRestaurantByName_restaurants[] | null;
}

export interface findRestaurantByName {
  findRestaurantByName: findRestaurantByName_findRestaurantByName;
}

export interface findRestaurantByNameVariables {
  input: FindRestaurantInput;
}
