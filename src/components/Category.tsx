import React from 'react';

interface ICategoriesProps {
  name: string;
  coverImage?: string | null;
}

export const Category: React.FC<ICategoriesProps> = ({ name, coverImage }) => {
  return (
    <li className="flex flex-col items-center cursor-pointer group">
      <div
        className="w-16 h-16 bg-cover rounded-full group-hover:bg-gray-100"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      <p className="mt-1 text-sm font-medium text-center capitalize">{name}</p>
    </li>
  );
};
