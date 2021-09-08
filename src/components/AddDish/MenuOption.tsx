import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, MouseEvent, useImperativeHandle, useState } from 'react';
import { MenuData } from '../../pages/owner/AddDish';

import OptionSettings, { OptionData } from '../Modal/OptionSettings';
import MenuOptionItem from './MenuOptionItem';

export interface MenuOptionRef {
  sendData: () => void;
}

interface MenuOptionProps {
  tempData?: MenuData;
  saveData: (data: any) => void;
}

interface OptionGroup extends OptionData {}

const MenuOption = ({ tempData, saveData }: MenuOptionProps, ref: React.Ref<MenuOptionRef>) => {
  const [optionGroup, setOptionGroup] = useState<OptionGroup[]>(tempData?.options || []);
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    sendData,
  }));

  const sendData = () => {
    if (optionGroup.length === 0) {
      return;
    }
    saveData({
      options: optionGroup,
    });
  };

  const onControlSettingModal = (visible: boolean, e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setModalVisible(visible);
  };

  const addOptionGroup = (option: OptionData) => {
    const id = Date.now();

    setOptionGroup((prev: any) => {
      return [...prev, Object.assign(option, { id: +id })];
    });
  };

  const deleteOptionGroup = (removeId: number, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOptionGroup(prev => prev.filter(group => group.id !== removeId));
  };

  return (
    <>
      <h1 className="my-5 text-3xl font-semibold">옵션 설정</h1>
      <p className="mb-2 text-base">
        옵션 <span className="text-sm text-gray-400">(선택)</span>
      </p>
      <button className="text-left text-uber" onClick={e => onControlSettingModal(true, e)}>
        <FontAwesomeIcon icon={faPlus} className="mr-1" /> 옵션그룹 추가
      </button>
      {optionGroup.length > 0 &&
        optionGroup.map((group: OptionGroup) => (
          <div key={`${group.id}-${group.name}`} className="mt-4">
            <div className="grid w-full">
              <div className="flex items-center justify-between gap-2">
                <MenuOptionItem option={group} />
                <button
                  className="h-full px-4 text-sm rounded-md text-lime-600 bg-lime-100"
                  onClick={e => deleteOptionGroup(group.id, e)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      <OptionSettings visible={modalVisible} onClose={() => onControlSettingModal(false)} addOption={addOptionGroup} />
    </>
  );
};

export default forwardRef<MenuOptionRef, MenuOptionProps>(MenuOption);
