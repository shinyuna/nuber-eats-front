/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishInput {
  name: string;
  description: string;
  price: number;
  photo: string;
  options?: DishOptionInputType[] | null;
  restaurantId: number;
}

export interface CreateRestaurantInput {
  name: string;
  coverImage: string;
  address: string;
  categoryName: string;
}

export interface DishChoiceInputType {
  name: string;
  price?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  min?: number | null;
  max?: number | null;
  isRequired?: boolean | null;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface FindRestaurantByCategoryInput {
  page?: number | null;
  limit: number;
  slug: string;
}

export interface FindRestaurantInput {
  page?: number | null;
  limit: number;
  query: string;
}

export interface GetRestaurantsInput {
  page?: number | null;
  limit: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
