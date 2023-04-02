import { Message } from '@arco-design/web-react';
import { useLocalStorageState, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { createList } from '@/api/car';
import { trim } from '@/utils';
import { isChinese } from '@/utils/is';

function useCarAdd() {
  const _keyArr: (keyof CarItem)[] = [
    'inventoryTime',
    'brand',
    'saleCount',
    'model',
    'guidePrice',
    'discount',
    'nakedPrice',
    'insurance',
    'purchaseTax',
    'landingPrice',
  ];
  const [list, setList] = useState<CarItem[]>([]);

  const [text, setText] = useLocalStorageState('carAddText', {
    defaultValue: '',
  });
  const [addKeys, setAddKeys] = useLocalStorageState<string[]>('carAddKeys', {
    defaultValue: [],
  });

  const transitionData = () => {
    const textArr = text
      .split('\n')
      .filter((item) => item.trim())
      .map((item) => (isChinese(item) ? item : trim(item)));

    const textArr2: CarItem[] = [];
    let list2: string[] = [];
    const keyArr = [..._keyArr, ...addKeys];
    let isSet = false;

    textArr.forEach((item, index) => {
      const reg = /^\d\d\.\d$/;
      if (reg.test(item) || index === textArr.length - 1) {
        if (reg.test(item) && !isSet) {
          isSet = true;
          const [y, m] = item.split('.');
          setInventoryTime(dayjs(new Date(`20${y}-0${m}`)).format('YYYY-MM'));
        }

        if (list2.length > 0) {
          const obj = {} as CarItem;

          list2.forEach((item, index) => {
            if (keyArr[index]) {
              obj[keyArr[index]] = item;
            }
          });
          textArr2.push(obj);
        }

        list2 = [];
      }

      list2.push(item);
    });

    setList(textArr2);

    return textArr2;
  };

  // const list = useMemo(() => {
  //   return transitionData(text);
  // }, [text, transitionData]);

  const { run: handleSave, loading } = useRequest(
    async () => {
      const res = await createList(
        list.map((item) => ({ ...item, inventoryTime: new Date(inventoryTime) })),
      );
      if (res.code === 200) {
        Message.success('添加成功');
        setText('');
      }
    },
    {
      manual: true,
    },
  );

  const [inventoryTime, setInventoryTime] = useLocalStorageState('inventoryTime', {
    defaultValue: dayjs().format('YYYY-MM'),
  });

  const handleTableChange = (dataIndex: string, value: string, index: number) => {
    list[index][dataIndex] = value;

    setList([...list]);
  };

  return {
    addKeys,
    setAddKeys,
    inventoryTime,
    setInventoryTime,
    handleSave,
    loading,
    list,
    text,
    setText,
    transitionData,
    handleTableChange,
  };
}

export default useCarAdd;
