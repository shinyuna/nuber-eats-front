import { gql } from '@apollo/client';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImage
    address
    isPromoted
    category {
      name
    }
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImage
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishParts on Dish {
    id
    name
    photo
    price
    description
    options {
      name
      price
      choices {
        name
        price
      }
    }
  }
`;

// export const MENU_FRAGMENT = gql`
//   fragment MenuParts on Menu {}
// `;
