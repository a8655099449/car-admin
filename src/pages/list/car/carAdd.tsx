import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Message,
  Radio,
  Space,
  Table,
} from '@arco-design/web-react';
import { useLocalStorageState } from 'ahooks';
import { useMemo, useState } from 'react';

import { createList } from '@/api/car';
import PageWrap from '@/components/base/PageWrap';
import { splitArrayForLen } from '@/utils';

import testStr from './testStr';
const keyArr: (keyof CarItem)[] = [
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

const transitionData = (str: string) => {
  const textArr = str.split('\n').filter((item) => item.trim());

  if (textArr.length % keyArr.length !== 0) {
    Message.warning('解析错误，请检查');

    return [];
  }

  let obj = {} as any;
  const itemList: CarItem[] = [];

  for (let i = 0; i < textArr.length; i++) {
    const v = textArr[i];

    const index = i % keyArr.length;

    obj[keyArr[index]] = v;
    if (index === keyArr.length - 1) {
      itemList.push(obj);
      obj = {};
    }
  }

  return itemList;
};

const computerForMac = (text: string, row = 3) => {
  const texts = text.split('\n').filter((item) => item.trim());
  const lenList = splitArrayForLen(texts, row);
  const res: CarItem[] = [];
  for (let i = 0; i < row; i++) {
    const item = {} as CarItem;
    lenList
      .map((item) => item[i])
      .forEach((v, index) => {
        const key = keyArr[index] as any;
        item[key] = v;
      });
    res.push(item);
  }

  return res;
};

const CreateList = () => {
  const [text, setText] = useLocalStorageState('carAddText', {
    defaultValue: testStr,
  });
  const [mode, setMode] = useLocalStorageState<'mac' | 'win'>('carAddMode', {
    defaultValue: 'mac',
  });

  const [row, setRow] = useState(3);

  const list = useMemo(() => {
    if (mode === 'mac') {
      return computerForMac(text, row);
    }
    return transitionData(text);
  }, [text, mode, row]);

  const handleSave = async () => {
    const res = await createList(list);
  };

  return (
    <PageWrap
      title={'新增车辆'}
      breadcrumb={[
        {
          title: '车辆列表',
          link: '/list/car',
        },
      ]}
      headExtra={
        <Space>
          {mode === 'mac' && (
            <InputNumber
              value={row}
              onChange={(e) => setRow(e)}
              style={{
                width: 60,
              }}
            />
          )}

          <Radio.Group
            type="button"
            name="mode"
            value={mode}
            onChange={(e) => setMode(e)}
          >
            <Radio value="mac">mac</Radio>
            <Radio value="win">windows</Radio>
          </Radio.Group>

          <Button
            href="https://space.bilibili.com/171595001/channel/collectiondetail?sid=246260"
            target="_blank"
          >
            前往百车盘点
          </Button>

          <DatePicker.MonthPicker />

          <Button onClick={handleSave} type="primary">
            保存
          </Button>
        </Space>
      }
    >
      <Input.TextArea
        style={{
          height: 200,
          marginBottom: 10,
        }}
        value={text}
        onChange={(e) => setText(e)}
      />
      <Table<CarItem>
        data={list}
        rowKey={'brand'}
        columns={[
          {
            dataIndex: 'inventoryTime',
            title: '盘点时间',
          },
          {
            dataIndex: 'brand',
            title: '品牌',
          },
          {
            dataIndex: 'saleCount',
            title: '销量',
          },
          {
            dataIndex: 'model',
            title: '车型',
          },
          {
            dataIndex: 'guidePrice',
            title: '指导价',
          },
          {
            dataIndex: 'discount',
            title: '优惠行情价',
          },
          {
            dataIndex: 'nakedPrice',
            title: '裸车价',
          },
          {
            dataIndex: 'insurance',
            title: '保险',
          },
          {
            dataIndex: 'purchaseTax',
            title: '购置税',
          },
          {
            dataIndex: 'landingPrice',
            title: '落地行情价',
          },
        ]}
      />
    </PageWrap>
  );
};

export default CreateList;
