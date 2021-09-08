import { numberWithCommas } from '../../formatters';
import { OptionData } from '../Modal/OptionSettings';

interface MenuOptionItemProps {
  option: OptionData;
}

const MenuOptionItem = ({ option }: MenuOptionItemProps) => {
  return (
    <div className="flex-1 p-4 rounded-md bg-lime-100 text-lime-600">
      <h4 className="mb-2 text-base font-semibold">{option.name}</h4>
      {option.choices.map((choice, index) => (
        <p className="text-sm" key={index}>
          <span>
            {choice.name} ({numberWithCommas(choice.price)}원)
          </span>
        </p>
      ))}
      <p className="mt-2 text-sm">
        <span className="mr-2">필수 여부 : {option.isRequired ? '🙆‍♀️' : '🙅‍♀️'}</span>
        <span className="mr-2">최소 선택 수 : {option.min}</span>
        <span>최대 선택 수 : {option.max}</span>
      </p>
    </div>
  );
};

export default MenuOptionItem;
