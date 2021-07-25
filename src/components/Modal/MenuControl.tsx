import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModalPortal from './ModalPortal';
import ModalBackground from './ModalBackground';

export interface MenuInfo {
  id: number;
  name: string;
}

interface MenuControlProps {
  visible: boolean;
  menuInfo: MenuInfo;
  onClose: () => void;
  deleteMenu: () => void;
}

const MenuControl = ({ visible, menuInfo, onClose, deleteMenu }: MenuControlProps) => {
  if (!visible) return null;

  return (
    <ModalPortal>
      <ModalBackground onClose={onClose}>
        <div className="flex px-4 py-3 text-center border-b border-gray-200">
          <FontAwesomeIcon icon={faTimes} className="text-xl text-gray-500 cursor-pointer" onClick={onClose} />
          <h1 className="flex-1">{menuInfo.name}</h1>
        </div>
        <ul className="text-lg text-center cursor-pointer">
          <li className="py-4 border-b border-gray-200">메뉴 정보 변경</li>
          <li className="py-4 border-b border-gray-200">메뉴 옵션 설정</li>
          <li className="py-4 text-red-500" onClick={deleteMenu}>
            메뉴 삭제
          </li>
        </ul>
      </ModalBackground>
    </ModalPortal>
  );
};
export default MenuControl;
