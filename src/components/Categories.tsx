import React, { FC } from 'react';
import { allRestaurantQuery_allCategories_categories } from '../api-types/allRestaurantQuery';

interface ICategoriesProps {
  categories: allRestaurantQuery_allCategories_categories[];
}

export const Categories: FC<ICategoriesProps> = ({ categories }) => {
  return (
    <ul className="flex justify-around max-w-sm mx-auto">
      {categories?.map(category => (
        <li className="flex flex-col items-center cursor-pointer group">
          <div
            className="w-16 h-16 bg-cover rounded-full group-hover:bg-gray-100"
            style={{ backgroundImage: `url(${category.coverImage})` }}
          ></div>
          <p className="mt-1 text-sm font-medium text-center capitalize">{category.name}</p>
        </li>
      ))}
    </ul>
  );
};
