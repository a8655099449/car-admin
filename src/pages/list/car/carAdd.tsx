import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Message,
  Popconfirm,
  Radio,
  ResizeBox,
  Space,
  Table,
} from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import { useLocalStorageState, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { createList } from '@/api/car';
import PageWrap from '@/components/base/PageWrap';
import IconButton from '@/components/IconButton';
import { splitArrayForLen, trim } from '@/utils';
import { isChinese } from '@/utils/is';

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
  const textArr = str
    .split('\n')
    .filter((item) => item.trim())
    .map((item) => (isChinese(item) ? item : trim(item)));

  // if (textArr.length % keyArr.length !== 0) {
  //   Message.warning('解析错误，请检查');
  //   return [];
  // }

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

const computerForMac = (text: string) => {
  const texts = text.split('\n').filter((item) => item.trim());

  const row = Math.ceil(texts.length / keyArr.length);

  const lenList = splitArrayForLen(texts, row);
  const res: CarItem[] = [];
  for (let i = 0; i < row; i++) {
    const item = {} as CarItem;
    lenList
      .map((item) => item[i])
      .forEach((v, index) => {
        const key = keyArr[index] as any;
        if (isChinese(v)) {
          console.log('👴2023-03-28 12:16:14 carAdd.tsx line:72', v);
          item[key] = v;
        } else {
          item[key] = trim(v);
        }
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

  const list = useMemo(() => {
    if (mode === 'mac') {
      return computerForMac(text);
    }
    return transitionData(text);
  }, [text, mode]);

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
          <Dropdown
            droplist={
              <Menu
                style={{
                  width: 150,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    paddingLeft: 16,
                  }}
                >
                  <Checkbox.Group
                    options={[
                      {
                        label: '环比变化',
                        value: 'monthChange',
                      },
                    ]}
                  />
                </div>
              </Menu>
            }
            position="bl"
            trigger={'click'}
          >
            <IconButton>
              <IconSettings />
            </IconButton>
          </Dropdown>

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
            href="https://space.bilibili.com/171595001/channel/coµllectiondetail?sid=246260"
            target="_blank"
          >
            前往百车盘点
          </Button>

          <DatePicker.MonthPicker value={inventoryTime} onChange={setInventoryTime} />

          <Popconfirm onOk={handleSave} title="确认是否保存？">
            <Button type="primary" loading={loading}>
              保存
            </Button>
          </Popconfirm>
        </Space>
      }
    >
      <div className="flex-between">
        <div>
          <Input.TextArea
            style={{
              height: 'calc(100vh - 180px)',
              marginBottom: 10,
              width: 500,
            }}
            value={text}
            onChange={(e) => setText(e)}
          />
        </div>
        <div
          style={{
            overflow: 'auto',
            height: 'calc(100vh - 180px)',
          }}
        >
          <Table<CarItem>
            data={list}
            rowKey={'brand'}
            pagination={false}
            style={{
              minWidth: 2000,
            }}
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
        </div>
      </div>
    </PageWrap>
  );
};

export default CreateList;
