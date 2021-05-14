import React from 'react';
import { Link } from 'react-router-dom';

interface IRestaurantProps {
  id: number;
  name: string;
  coverImage: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({ id, name, coverImage, categoryName }) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="cursor-pointer ">
        <div
          className="py-20 mb-2 bg-gray-200 bg-center bg-cover"
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="px-2 py-1 text-xs text-green-500 rounded-full bg-green-50">4.2</p>
        </div>
        <div className="pt-2 mt-2 border-t">
          <p className="text-xs text-gray-400 capitalize">{categoryName}</p>
        </div>
      </div>
    </Link>
  );
};
