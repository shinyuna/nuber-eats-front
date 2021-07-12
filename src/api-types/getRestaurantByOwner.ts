/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRestaurantByOwner
// ====================================================

export interface getRestaurantByOwner_getRestaurantByOwner_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface getRestaurantByOwner_getRestaurantByOwner_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  price: number;
}

export interface getRestaurantByOwner_getRestaurantByOwner_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  max: number;
  choices: getRestaurantByOwner_getRestaurantByOwner_restaurant_menu_options_choices[] | null;
}

export interface getRestaurantByOwner_getRestaurantByOwner_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  photo: string;
  price: number;
  description: string;
  options: getRestaurantByOwner_getRestaurantByOwner_restaurant_menu_options[] | null;
}

export interface getRestaurantByOwner_getRestaurantByOwner_restaurant_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface getRestaurantByOwner_getRestaurantByOwner_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: getRestaurantByOwner_getRestaurantByOwner_restaurant_category | null;
  menu: getRestaurantByOwner_getRestaurantByOwner_restaurant_menu[];
  orders: getRestaurantByOwner_getRestaurantByOwner_restaurant_orders[];
}

export interface getRestaurantByOwner_getRestaurantByOwner {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: getRestaurantByOwner_getRestaurantByOwner_restaurant | null;
}

export interface getRestaurantByOwner {
  getRestaurantByOwner: getRestaurantByOwner_getRestaurantByOwner;
}

export interface getRestaurantByOwnerVariables {
  input: RestaurantInput;
}
