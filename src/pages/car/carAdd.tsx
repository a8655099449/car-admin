import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Popconfirm,
  Space,
  Table,
} from '@arco-design/web-react';
import { IconRefresh, IconRightCircle, IconSettings } from '@arco-design/web-react/icon';
import { useLocalStorageState } from 'ahooks';
import { useMemo } from 'react';

import PageWrap from '@/components/base/PageWrap';
import IconButton from '@/components/IconButton';

import useCarAdd from './useCarAdd';

const CreateList = () => {
  const {
    list,
    text,
    setText,
    setAddKeys,
    setInventoryTime,
    addKeys,
    loading,
    handleSave,
    inventoryTime,
    transitionData,
    handleTableChange,
    ignoreRows,
    setIgnoreRows,
    regKey,
    setRegKey,
  } = useCarAdd();

  const addKeyOptions = [
    {
      label: '环比变化',
      value: 'monthChange',
    },
    {
      label: '位置',
      value: 'position',
    },
  ];

  const findErrorText = (key: string, insert = '') => {
    const reg = new RegExp(key);

    setText(text.replace(reg, `${key}\n${insert}\n`));
    // setTimeout(() => {
    //   transitionData();
    // }, 500);
  };

  const cols = useMemo(() => {
    const cols = [
      {
        dataIndex: 'inventoryTime',
        title: '盘点时间',
      },
      {
        dataIndex: 'brand',
        title: '品牌',
        width: 150,
      },
      {
        dataIndex: 'saleCount',
        title: '销量',
      },
      {
        dataIndex: 'model',
        title: '车型',
        width: 200,
      },
      {
        dataIndex: 'guidePrice',
        title: '指导价',
      },
      {
        dataIndex: 'discount',
        title: '优惠行情价',
        width: 150,
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
    ];

    const addCols = addKeyOptions
      .filter(({ value }) => addKeys.includes(value))
      .map((item) => ({
        dataIndex: item.value,
        title: item.label,
      }));

    const joinList = [...cols, ...addCols];

    return joinList.map((item) => ({
      ...item,
      render: (v, _, index) => {
        const { dataIndex } = item;

        const red = () => {
          if (
            ['landingPrice', 'guidePrice', 'nakedPrice'].includes(dataIndex) &&
            v < 40000
          ) {
            return 'red';
          }

          if (
            !['品牌', '车型', '位置', '环比变化'].includes(item.title) &&
            isNaN(parseInt(v))
          ) {
            return 'red';
          }

          if (item.title === '优惠行情价' && v > 2000) {
            return '#ff9f27';
          }

          return undefined;
        };

        return (
          <Space>
            <Input
              value={v}
              style={{
                width: '100%',
                borderColor: red(),
              }}
              size="mini"
              onChange={(e) => {
                handleTableChange(item.dataIndex, e, index);
              }}
              onPressEnter={() => {
                if (item.title === '指导价') {
                  findErrorText(`${list[index]['model']}\n${v}\n`, '0');
                }
              }}
            />
            {/* {item.title === '指导价' && (
              <IconButton size="mini" onClick={() => findErrorText(v)}>
                <IconRightCircle />
              </IconButton>
            )} */}
          </Space>
        );
      },
    }));
  }, [addKeys, addKeyOptions, text, list]);
  const [errTime, setErrTime] = useLocalStorageState('errorAddTime', {
    defaultValue: '227',
  });

  const handleErrTime = () => {
    const reg = new RegExp(`\n${errTime}`, 'g');
    setText(text.replace(reg, `\n${errTime[0]}${errTime[1]}.${errTime[2]}`));
  };

  return (
    <PageWrap
      title={'新增车辆'}
      breadcrumb={[
        {
          title: '车辆列表',
          link: '/car',
        },
      ]}
      headExtra={
        <Space>
          <Button onClick={handleErrTime} type="primary">
            时间纠错
          </Button>

          <Input placeholder="忽略" value={ignoreRows} onChange={setIgnoreRows} />

          <Input placeholder="time" value={regKey} onChange={setRegKey} />

          <Button onClick={transitionData} type="primary">
            转换
          </Button>
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
                    value={addKeys}
                    onChange={setAddKeys}
                    options={addKeyOptions}
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
              width: 400,
              marginRight: 10,
            }}
            value={text}
            onChange={(e) => setText(e)}
            onKeyDown={(event) => {
              const keyCombination = event.ctrlKey;
              if (keyCombination && event.key === 'Enter') {
                transitionData();
              }
            }}
          />
        </div>
        <div
          style={{
            overflow: 'auto',
            height: 'calc(100vh - 180px)',
          }}
        >
          <Table<CarItem>
            size="mini"
            data={list}
            rowKey={'brand'}
            pagination={false}
            style={{
              minWidth: 1500,
            }}
            columns={cols}
          />
        </div>
      </div>
    </PageWrap>
  );
};

export default CreateList;
