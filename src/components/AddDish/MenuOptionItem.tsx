import { numberWithCommas } from '../../formatters';
import { OptionData } from '../Modal/OptionSettings';

interface MenuOptionItemProps {
  option: OptionData;
}

const MenuOptionItem = ({ option }: MenuOptionItemProps) => {
  return (
    <div className="flex-1 p-4 border rounded-md border-lime-500 bg-lime-50 text-lime-600">
      <h4 className="mb-2 text-base font-semibold">{option.name}</h4>
      {option.choices.map((choice, index) => (
        <p className="text-sm" key={index}>
          <span className="mr-2">{choice.name}</span>
          <span>{numberWithCommas(choice.price)}₩</span>
        </p>
      ))}
      <p className="text-sm">
        <span className="mr-2">필수 여부</span>
        <span>{option.isRequired ? '🙆‍♀️' : '🙅‍♀️'}</span>
      </p>
      <p className="text-sm">
        <span className="mr-2">최소 선택 수</span>
        <span>{option.min}</span>
      </p>
      <p className="text-sm">
        <span className="mr-2">최대 선택 수</span>
        <span>{option.max}</span>
      </p>
    </div>
  );
};

export default MenuOptionItem;
