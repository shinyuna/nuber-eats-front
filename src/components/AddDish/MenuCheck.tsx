import { MenuData } from '../../pages/owner/AddDish';
import MenuOptionItem from './MenuOptionItem';

interface MenuCheckProps {
  menuData: MenuData;
}

const MenuCheck = ({ menuData }: MenuCheckProps) => {
  console.log('🚀 ~ MenuCheck ~ menuData', menuData);
  return (
    <div>
      <h1>메뉴 등록 정보</h1>
      <div>
        <h2>메뉴 정보</h2>
        <p>
          <span>메뉴명</span>
          <span>{menuData.name}</span>
        </p>
        <p>
          <span>메뉴 설명</span>
          <span>{menuData.description}</span>
        </p>
        <p>
          <span>메뉴 가격</span>
          <span>{menuData.price}</span>
        </p>
        <p>
          <span>메뉴 사진</span>
          <img src={window.URL.createObjectURL(menuData.file[0])} alt="메뉴 이미지" />
        </p>
      </div>
      <div>
        <h2>메뉴 옵션</h2>
        {!menuData?.options && <p>옵션 메뉴가 없습니다.</p>}
        {menuData?.options &&
          menuData.options.map((option, idex) => <MenuOptionItem key={`option-${idex}`} option={option} />)}
      </div>
    </div>
  );
};

export default MenuCheck;
