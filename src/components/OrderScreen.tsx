import React from 'react';
import ModalPortal from './ModalPortal';

import { DishParts } from '../api-types/DishParts';

interface OrderScreenProps {
  visible: boolean;
  menu: DishParts;
  onClose: () => void;
}

const OrderScreen = ({ visible, menu, onClose }: OrderScreenProps) => {
  if (!visible) return null;

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalPortal>
      <div
        className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
        onClick={onClose}
      >
        <div className="max-w-2xl bg-white" onClick={stopPropagation}>
          <div className="h-96">
            <img className="object-cover object-bottom w-full h-full" src={menu.photo} alt={menu.name} />
          </div>
          <div className="mx-4 my-4">
            <div>
              <h1 className="text-2xl">{menu.name}</h1>
              <p className="mt-2 text-sm">{menu.description}</p>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default OrderScreen;
