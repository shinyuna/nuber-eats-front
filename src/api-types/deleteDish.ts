/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteDish
// ====================================================

export interface deleteDish_deleteDish {
  __typename: "DeleteDishOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteDish {
  deleteDish: deleteDish_deleteDish;
}

export interface deleteDishVariables {
  input: DeleteDishInput;
}
