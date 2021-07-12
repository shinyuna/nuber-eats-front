import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModalPortal from './ModalPortal';

export interface MenuInfo {
  id: number;
  name: string;
}

interface MenuControlProps {
  visible: boolean;
  menuInfo: MenuInfo;
  onClose: () => void;
}

const MenuControl = ({ visible, menuInfo, onClose }: MenuControlProps) => {
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
        <div className="w-full max-w-md bg-white sm:absolute sm:bottom-0" onClick={stopPropagation}>
          <div className="flex px-4 py-3 text-center border-b border-gray-200">
            <FontAwesomeIcon icon={faTimes} className="text-xl text-gray-500 cursor-pointer" onClick={onClose} />
            <h1 className="flex-1">{menuInfo.name}</h1>
          </div>
          <ul className="text-lg text-center cursor-pointer">
            <li className="py-4 border-b border-gray-200">메뉴 정보 변경</li>
            <li className="py-4 border-b border-gray-200">메뉴 옵션 설정</li>
            <li className="py-4 text-red-500">메뉴 삭제</li>
          </ul>
        </div>
      </div>
    </ModalPortal>
  );
};
export default MenuControl;
