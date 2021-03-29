import React from 'react';

interface IRestaurantProps {
  id: number;
  name: string;
  coverImage: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({ name, coverImage, categoryName }) => {
  return (
    <div className="cursor-pointer ">
      <div
        className="py-20 mb-2 bg-gray-200 bg-center bg-cover"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      {/* <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="px-2 py-1 text-sm text-green-500 rounded-full bg-green-50">{categoryName}</p>
      </div> */}
      <div>
        <h3 className="mt-1 text-lg font-medium border-b">{name}</h3>
        <p className="mt-2 text-xs text-gray-400 capitalize">{categoryName}</p>
      </div>
    </div>
  );
};
