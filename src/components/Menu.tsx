import React from 'react';

interface IMenuProps {
  name: string;
  description: string;
  price: number;
  photo: string;
}

export const Menu: React.FC<IMenuProps> = ({ name, description, price, photo }) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between flex-1 p-4 border border-gray-200">
        <div className="tracking-wide">
          <p className="text-medium">{name}</p>
          <p className="mt-2 text-xs">{description}</p>
        </div>
        <p>{price} &#8361;</p>
      </div>
      <div className="flex-1 flex-shrink h-40 bg-gray-200">
        <img className="object-cover w-full h-full" src={photo} alt={name} />
      </div>
    </div>
  );
};
