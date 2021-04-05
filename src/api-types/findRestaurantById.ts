/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRestaurantById
// ====================================================

export interface findRestaurantById_findRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface findRestaurantById_findRestaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: findRestaurantById_findRestaurantById_restaurant_category | null;
}

export interface findRestaurantById_findRestaurantById {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: findRestaurantById_findRestaurantById_restaurant | null;
}

export interface findRestaurantById {
  findRestaurantById: findRestaurantById_findRestaurantById;
}

export interface findRestaurantByIdVariables {
  input: RestaurantInput;
}
