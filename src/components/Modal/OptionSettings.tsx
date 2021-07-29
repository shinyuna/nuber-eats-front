import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { useForm } from 'react-hook-form';
import { FormError } from '../FormError';

import ModalPortal from './ModalPortal';
import ModalBackground from './ModalBackground';

interface OptionSettingsProps {
  visible: boolean;
  onClose: () => void;
  addOption: (data: OptionData) => void;
}

interface Option {
  name: string;
  price: number;
}

export interface OptionData {
  id: number;
  name: string;
  choices: Option[];
  min: number;
  max: number;
  isRequired: boolean;
}

const OptionSettings = ({ visible, onClose, addOption }: OptionSettingsProps) => {
  const [tempData, setTempData] = useState<OptionData>();
  const [step, setStep] = useState<number>(1);
  const [optionCount, setOptionCount] = useState<number[]>([1]);
  const [error, setError] = useState<string>('');

  const { register, getValues } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setStep(1);
    setOptionCount([1]);
  }, [visible]);

  if (!visible) {
    return null;
  }

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    const noValues = Object.values(getValues()).filter(v => !v).length;
    if (noValues !== 0) {
      return setError('빈 칸을 다 채워주세요.');
    }

    const { id, name, min, max, isRequired, ...rest } = getValues();
    const options: Option[] = optionCount.map(theId => ({
      name: rest[`optionName-${theId}`],
      price: +rest[`optionPrice-${theId}`],
    }));

    setError('');
    addOption({
      id,
      name,
      choices: options,
      min,
      max,
      isRequired: isRequired === 'true' ? true : false,
    });
    onClose();
  };

  const saveTempData = () => {
    const data = getValues();
    setTempData((prev: any) => {
      return { ...prev, ...data };
    });
  };

  const stepControl = (direction: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (direction === 'next') {
      if (step === 3) return;
      setStep(prev => prev + 1);
    } else {
      if (step === 1) return;
      setStep(prev => prev - 1);
    }
    saveTempData();
  };

  const addMenuOption = () => {
    const id = Date.now();
    setOptionCount(prev => {
      return [...prev, id];
    });
  };

  const deleteMenuOption = (removeId: number) => {
    setOptionCount(prev => {
      return prev.filter(id => id !== removeId);
    });
  };

  return (
    <ModalPortal>
      <ModalBackground modalSize="max-w-lg">
        <div className="flex px-4 py-3 text-center border-b border-gray-200">
          <FontAwesomeIcon icon={faTimes} className="text-xl text-gray-500 cursor-pointer" onClick={onClose} />
          <h1 className="flex-1">옵션그룹 추가</h1>
        </div>
        <div className="px-6 pb-4">
          {/* 그룹 명 */}
          <div className={`w-full ${step !== 1 && 'hidden'}`}>
            <p className="py-4 text-base">옵션그룹명</p>
            <input
              type="text"
              name="name"
              ref={register({
                required: '옵션그룹명은 필수 입력입니다.',
              })}
              className="w-full input"
              placeholder="예) 맵기"
              autoFocus
            />
          </div>
          <div className={`w-full mt-4 ${step !== 2 && 'hidden'}`}>
            {optionCount.length > 0 &&
              optionCount.map(id => (
                <div key={id} className="mt-2">
                  <div className="flex items-center justify-between my-4">
                    <p className="text-base ">옵션 설정</p>
                    <button
                      className="float-right w-12 h-8 text-sm rounded-md text-lime-600 bg-lime-100"
                      onClick={() => deleteMenuOption(id)}
                    >
                      삭제
                    </button>
                  </div>
                  <input
                    type="text"
                    name={`optionName-${id}`}
                    ref={register({
                      required: '옵션명은 필수 입력입니다.',
                    })}
                    className="w-full input"
                    placeholder="예) 매운맛"
                    autoFocus
                  />
                  <input
                    type="number"
                    name={`optionPrice-${id}`}
                    ref={register({
                      required: '옵션 가격은 필수 입력입니다.',
                    })}
                    className="w-full mt-2 input"
                    placeholder="원"
                  />
                </div>
              ))}
            <button className="mt-2 text-left text-uber" onClick={addMenuOption}>
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> 옵션 추가
            </button>
          </div>
          <div className={`w-full ${step !== 3 && 'hidden'}`}>
            <h2 className="pb-2 mt-4 text-lg border-b border-gray-200">선택 가능한 옵션 수</h2>
            <p className="py-4 text-base">필수 여부</p>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="isRequired"
                  ref={register({
                    required: '옵션 필수 여부를 체크해주세요.',
                  })}
                  value="true"
                  id="true"
                  defaultChecked
                />
                <label htmlFor="true" className="text-sm">
                  옵션을 반드시 선택해야 주문 가능
                </label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="isRequired"
                  ref={register({
                    required: '옵션 필수 여부를 체크해주세요.',
                  })}
                  value="false"
                  id="false"
                />
                <label htmlFor="false" className="text-sm">
                  옵션을 선택하지 않아도 주문 가능
                </label>
              </div>
            </div>
            <p className="my-4 text-base">옵션 선택 수 (최소/최대)</p>
            <div className="grid grid-cols-2 gap-4">
              <input ref={register} type="number" name="min" className="w-full input" min="0" placeholder="Min" />
              <input ref={register} type="number" name="max" className="w-full input" min="1" placeholder="Max" />
            </div>
            <p className="mt-6">
              이 옵션 그룹에는 옵션이 총 <span className="text-uber">{optionCount.length}</span>개 있습니다.
            </p>
          </div>
          {/* 버튼 */}
          <div className="mt-4 text-right">
            {error && <FormError errMsg={error} />}
            {step !== 1 && (
              <button className="p-4 text-lime-500" onClick={e => stepControl('prev', e)}>
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                이전
              </button>
            )}
            {step !== 3 && (
              <button className="ml-4 button" onClick={e => stepControl('next', e)}>
                디음
              </button>
            )}
            {step === 3 && (
              <button className="ml-4 button" onClick={sendData}>
                추가
              </button>
            )}
          </div>
        </div>
      </ModalBackground>
    </ModalPortal>
  );
};

export default OptionSettings;
