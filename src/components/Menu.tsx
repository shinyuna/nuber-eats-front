import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DishParts } from '../api-types/DishParts';
import { numberWithCommas } from '../formatters';

interface IMenuProps {
  menu: DishParts;
  isCustomer?: boolean;
  makeOrder?: () => void;
  openControler?: () => void;
}

export const Menu = ({ menu, isCustomer = false, makeOrder, openControler }: IMenuProps) => {
  return (
    <div
      className={`flex relative ${isCustomer ? 'cursor-pointer' : undefined}`}
      onClick={isCustomer ? makeOrder : undefined}
    >
      <div className="flex flex-col justify-between flex-1 p-4 border border-gray-200">
        <div className="tracking-wide">
          <p className="text-medium">{menu.name}</p>
          <p className="mt-2 text-xs">{menu.description}</p>
        </div>
        <p>{numberWithCommas(menu.price)} &#8361;</p>
      </div>
      <div className="flex-1 flex-shrink h-40 bg-gray-200">
        <img className="object-cover w-full h-full" src={menu.photo} alt={menu.name} />
      </div>
      {!isCustomer && (
        <button
          className="absolute px-2 bg-white rounded-full shadow-md text-uber right-2 top-2"
          onClick={openControler}
        >
          <FontAwesomeIcon icon={faEllipsisH} className="text-2xl align-middle" />
        </button>
      )}
    </div>
  );
};
