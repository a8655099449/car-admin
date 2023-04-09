import { Button, Drawer } from '@arco-design/web-react';
import { IconPlus, IconRefresh } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import { FC, ReactElement, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { updateList } from '@/api/car';
import PageWrap from '@/components/base/PageWrap';
import Price from '@/components/base/Price';
import ProTable from '@/components/proTable/ProTable';
import { ProTableInstance } from '@/components/proTable/type';
import request from '@/utils/request';
import storage from '@/utils/storage';

type CarPageProps = any;
const CarPage: FC<CarPageProps> = (): ReactElement => {
  const [selectedRow, setSelectedRow] = useState<CarItem[]>([]);
  const ref = useRef<ProTableInstance<CarItem>>({});

  const { data = [] } = useRequest(
    () =>
      request<string[]>({
        url: '/car/brand',
        returnData: true,
      }),
    {
      manual: true,
    },
  );

  const updateRows = () => {
    console.log(selectedRow);

    updateList(
      selectedRow.map((item) => ({ ...item, inventoryTime: new Date('2022-11') })),
    );
  };

  return (
    <PageWrap>
      <ProTable<CarItem>
        rowKey={'id'}
        showIndex
        activeRef={ref}
        baseRequestUrl="/car"
        toolButtons={[
          <Button key={'update'} icon={<IconRefresh />} onClick={updateRows}>
            批量更新
          </Button>,
          <Link to="/car/carAdd" key={'add'}>
            <Button type="primary" icon={<IconPlus />}>
              添加
            </Button>
          </Link>,
        ]}
        searchFormProps={{
          onValuesChange(target) {
            if (Object.keys(target)[0] === 'inventoryTime') {
              storage.set('inventoryTime', target.inventoryTime);
            }
          },
          initialValues: {
            inventoryTime: storage.get('inventoryTime') || undefined,
          },
        }}
        rowSelection={{
          selectedRowKeys: selectedRow.map((item) => item.id),
          onSelect(selected, record, selectedRows) {
            setSelectedRow(selectedRows);
          },
          onSelectAll(selected, selectedRows) {
            setSelectedRow(selectedRows);
          },
        }}
        title={'百车盘点'}
        pagination={{
          defaultPageSize: 50,
        }}
        columns={[
          {
            title: '盘点时间',
            dataIndex: 'inventoryTime',
            valueType: 'dateMonth',
            search: true,
            sorter: true,
          },
          {
            title: '品牌',
            dataIndex: 'brand',
            search: true,
            filters: data.map((v) => ({
              text: v,
              value: v,
            })),
          },
          {
            title: '型号',
            dataIndex: 'model',
            search: true,
          },
          {
            title: '销量',
            dataIndex: 'saleCount',
            sorter: true,
          },
          {
            title: '指导价',
            dataIndex: 'guidePrice',
            render(item) {
              return <Price price={item} />;
            },
            sorter: true,
            valueType: 'number',
          },
          {
            title: '优惠行情',
            dataIndex: 'discount',
            sorter: true,
            valueType: 'number',
          },
          {
            title: '裸车价',
            dataIndex: 'nakedPrice',
            sorter: true,
          },
          {
            title: '保险',
            dataIndex: 'insurance',
            render(item) {
              return <Price price={item} unit={1000} />;
            },
            valueType: 'number',
          },
          {
            title: '购置税',
            dataIndex: 'purchaseTax',
            valueType: 'number',
          },
          {
            title: '落地价格',
            dataIndex: 'landingPrice',
            valueType: 'number',
            sorter: true,
            render(item) {
              return <Price price={item} />;
            },
            defaultSortOrder: 'ascend',
            filters: [
              {
                text: '5w-7w',
                value: '50000,70000',
              },
              {
                text: '7w-12w',
                value: '70000,120000',
              },
              {
                text: '12w-16w',
                value: '120000,160000',
              },
              {
                text: '16w-22w',
                value: '160000,220000',
              },
              {
                text: '22w-30w',
                value: '220000,300000',
              },
              {
                text: '>30w',
                value: '300000,99900000',
              },
            ],
            filterMultiple: false,
          },
        ]}
        showHandle
        queryPageOptions={{
          method: 'post',
        }}
      />
    </PageWrap>
  );
};

export default CarPage;
