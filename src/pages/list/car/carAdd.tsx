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
  } = useCarAdd();

  const addKeyOptions = [
    {
      label: '环比变化',
      value: 'monthChange',
    },
  ];

  const findErrorText = (key: string) => {
    const reg = new RegExp(`\n${key}`);

    setText(text.replace(reg, ` ${key}`));
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

    return [...cols, ...addCols].map((item) => ({
      ...item,
      render: (v, _, index) => {
        return (
          <Space>
            <Input
              value={v}
              style={{
                width: '100%',
              }}
              size="mini"
              onChange={(e) => {
                handleTableChange(item.dataIndex, e, index);
              }}
            />
            {item.title === '指导价' && (
              <IconButton size="mini" onClick={() => findErrorText(v)}>
                <IconRightCircle />
              </IconButton>
            )}
            {item.dataIndex === 'monthChange' && (
              <IconButton
                size="mini"
                onClick={(e) => {
                  handleTableChange(item.dataIndex, (v * -1).toString(), index);
                }}
              >
                <IconRefresh />
              </IconButton>
            )}
          </Space>
        );
      },
    }));
  }, [addKeys, addKeyOptions]);

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
            size="mini"
            data={list}
            rowKey={'brand'}
            pagination={false}
            style={{
              minWidth: 1300,
            }}
            columns={cols}
          />
        </div>
      </div>
    </PageWrap>
  );
};

export default CreateList;
