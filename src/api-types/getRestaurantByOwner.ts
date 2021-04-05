/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRestaurantByOwner
// ====================================================

export interface getRestaurantByOwner_getRestaurantByOwner_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface getRestaurantByOwner_getRestaurantByOwner_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: getRestaurantByOwner_getRestaurantByOwner_restaurants_category | null;
}

export interface getRestaurantByOwner_getRestaurantByOwner {
  __typename: "GetRestaurantByOwnerOutput";
  ok: boolean;
  error: string | null;
  restaurants: getRestaurantByOwner_getRestaurantByOwner_restaurants[];
}

export interface getRestaurantByOwner {
  getRestaurantByOwner: getRestaurantByOwner_getRestaurantByOwner;
}
