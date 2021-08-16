import { MenuData } from '../../pages/owner/AddDish';
import MenuOptionItem from './MenuOptionItem';

interface MenuCheckProps {
  menuData: MenuData;
}

const MenuCheck = ({ menuData }: MenuCheckProps) => {
  return (
    <div>
      <h1 className="my-5 text-3xl font-semibold">메뉴 등록 정보</h1>
      <div className="p-6 rounded-md shadow-lg">
        <h2 className="text-xl">메뉴 정보</h2>
        <div className="my-4 border-t border-gray-200">
          <p className="my-2">메뉴명</p>
          <p>{menuData.name}</p>
        </div>
        <div className="my-4 border-t border-gray-200">
          <p className="my-2">메뉴 설명</p>
          <p>{menuData.description}</p>
        </div>
        <div className="my-4 border-t border-gray-200">
          <p className="my-2">메뉴 가격</p>
          <p>{menuData.price}</p>
        </div>
        <div className="my-4 border-t border-gray-200">
          <p className="my-2">메뉴 사진</p>
          <img src={window.URL.createObjectURL(menuData.file[0])} alt="메뉴 이미지" />
        </div>
      </div>
      <div className="p-6 mt-6 rounded-md shadow-lg">
        <h2 className="mb-4 text-xl">메뉴 옵션 정보</h2>
        {!menuData?.options && <p>옵션 메뉴가 없습니다.</p>}
        {menuData?.options &&
          menuData.options.map((option, idex) => <MenuOptionItem key={`option-${idex}`} option={option} />)}
      </div>
    </div>
  );
};

export default MenuCheck;
