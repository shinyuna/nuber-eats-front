/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRestaurant
// ====================================================

export interface getRestaurant_getRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface getRestaurant_getRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: getRestaurant_getRestaurant_restaurant_category | null;
}

export interface getRestaurant_getRestaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: getRestaurant_getRestaurant_restaurant | null;
}

export interface getRestaurant {
  getRestaurant: getRestaurant_getRestaurant;
}

export interface getRestaurantVariables {
  input: RestaurantInput;
}
