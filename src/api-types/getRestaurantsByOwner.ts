/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRestaurantsByOwner
// ====================================================

export interface getRestaurantsByOwner_getRestaurantsByOwner_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface getRestaurantsByOwner_getRestaurantsByOwner_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: getRestaurantsByOwner_getRestaurantsByOwner_restaurants_category | null;
}

export interface getRestaurantsByOwner_getRestaurantsByOwner {
  __typename: "GetRestaurantsByOwnerOutput";
  ok: boolean;
  error: string | null;
  restaurants: getRestaurantsByOwner_getRestaurantsByOwner_restaurants[];
}

export interface getRestaurantsByOwner {
  getRestaurantsByOwner: getRestaurantsByOwner_getRestaurantsByOwner;
}
