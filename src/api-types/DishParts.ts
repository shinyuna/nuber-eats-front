/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishParts
// ====================================================

export interface DishParts_options_choices {
  __typename: "DishChoice";
  name: string;
  price: number | null;
}

export interface DishParts_options {
  __typename: "DishOption";
  name: string;
  price: number | null;
  choices: DishParts_options_choices[] | null;
}

export interface DishParts {
  __typename: "Dish";
  id: number;
  name: string;
  photo: string;
  price: number;
  description: string;
  options: DishParts_options[] | null;
}
