import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/pro-light-svg-icons';
import { MenuData } from '../../pages/owner/AddDish';

export interface MenuInfoRef {
  sendData: () => void;
}

interface MenuInfoProps {
  tempData?: MenuData;
  saveData: (data: any) => void;
}

export interface MenuInfoForm {
  [key: string]: any;
  name: string;
  description: string;
  price: string;
  file: FileList;
  fileName: string;
}

/**
 * @todo 데이터 미입력 시 버튼 안눌리게
 */

const MenuInfo = ({ tempData, saveData }: MenuInfoProps, ref: React.Ref<MenuInfoRef>) => {
  const { register, setValue, getValues } = useForm<MenuInfoForm>({
    mode: 'onChange',
    defaultValues: {
      ...tempData,
    },
  });

  useImperativeHandle(ref, () => ({
    sendData,
  }));

  const sendData = () => {
    const data = getValues();

    for (let item in data) {
      if (!data[item]) {
        return '빈 칸을 모두 채워주세요.';
      }
    }

    saveData({
      name: data.name,
      description: data.description,
      price: data.price,
      file: data.file,
      fileName: data.fileName,
    });
  };

  const updateFileName = useCallback(
    e => {
      setValue('fileName', e.target.files[0].name);
    },
    [setValue]
  );

  return (
    <form className="grid gap-3">
      <h1 className="my-5 text-3xl font-semibold">메뉴 정보</h1>
      <p className="mb-2 text-base">메뉴 이름</p>
      <input
        className="input"
        name="name"
        type="text"
        ref={register({
          required: 'Name is required.',
        })}
        placeholder="예) 치즈떡볶이"
      />
      <p className="mb-2 text-base">메뉴 설명</p>
      <input
        className="input"
        name="description"
        type="text"
        ref={register({
          required: 'Description is required.',
        })}
        placeholder="예) 치즈가 듬뿍 올라간 매콤한 떡볶이 ~"
      />
      <p className="mb-2 text-base">메뉴 가격</p>
      <input
        className="input"
        name="price"
        type="number"
        min="0"
        ref={register({
          min: 0,
          required: 'Price is required.',
        })}
        placeholder="원"
      />
      <p className="mb-2 text-base">메뉴 대표 이미지</p>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-4">
        <input
          id="menu_image"
          className="hidden"
          type="file"
          name="file"
          accept="image/png, image/jpeg"
          ref={register}
          onChange={updateFileName}
        />
        <input
          readOnly
          className="col-start-1 col-end-5 sm:col-end-4 input"
          type="text"
          name="fileName"
          ref={register}
        />
        <label className="button " htmlFor="menu_image">
          <FontAwesomeIcon icon={faImages} size={'2x'} />
        </label>
      </div>
    </form>
  );
};

export default forwardRef<MenuInfoRef, MenuInfoProps>(MenuInfo);
