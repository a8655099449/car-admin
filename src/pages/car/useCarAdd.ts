import { Message } from '@arco-design/web-react';
import { useLocalStorageState, useRequest } from 'ahooks';
import dayjs from 'dayjs';

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
  const [list, setList] = useLocalStorageState<CarItem[]>('carAddList', {
    defaultValue: [],
  });

  const [text, setText] = useLocalStorageState('carAddText', {
    defaultValue: '',
  });
  const [ignoreRows, setIgnoreRows] = useLocalStorageState('ignoreRows', {
    defaultValue: '',
  });
  const [addKeys, setAddKeys] = useLocalStorageState<string[]>('carAddKeys', {
    defaultValue: [],
  });
  const [regKey, setRegKey] = useLocalStorageState<string>('regKey', {
    defaultValue: '2211',
  });

  const transitionData = () => {
    const textArr = text
      .split('\n')
      .filter((item) => item.trim())
      .map((item, i) => (i === 2 ? item : trim(item)))
      .map((item) => item.replace(/^[.|,]/, '-'));

    setText(textArr.join('\n'));
    const textArr2: CarItem[] = [];
    let list2: string[] = [];
    const keyArr = [..._keyArr, ...addKeys];
    let isSet = false;
    const reg = new RegExp(`^${regKey}$`);

    console.log(reg);

    textArr.forEach((item, index) => {
      if (reg.test(item) || index === textArr.length - 1) {
        if (reg.test(item) && !isSet) {
          isSet = true;
          let [y] = item.split('.');
          let [, m] = item.split('.');

          if (item.length === 4 && !m) {
            m = item[2] + item[3];
            y = item[0] + item[1];
          }

          setInventoryTime(
            dayjs(new Date(`20${y}-${m?.length > 1 ? m : '0' + m}`)).format('YYYY-MM'),
          );
        }

        if (list2.length > 0) {
          const obj = {} as CarItem;
          const iR = ignoreRows.split(',').map((item) => Number(item));

          let i = 0;

          list2.forEach((item, index) => {
            if (iR.includes(index)) {
              i++;
            }
            if (keyArr[index]) {
              obj[keyArr[index]] = list2[index + i];
            }
          });

          if (reg.test(obj.inventoryTime as string)) {
            textArr2.push(obj);
          }
        }

        list2 = [];
      }

      list2.push(item);
    });

    setList(textArr2);

    return textArr2;
  };

  const { run: handleSave, loading } = useRequest(
    async () => {
      const res = await createList(
        list.map((item) => ({ ...item, inventoryTime: new Date(inventoryTime) })),
      );
      if (res.code === 200) {
        Message.success('添加成功');
        setText('');
        setList([]);
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
    ignoreRows,
    setIgnoreRows,
    regKey,
    setRegKey,
  };
}

export default useCarAdd;
