import { Button, Drawer } from '@arco-design/web-react';
import { IconPlus, IconRefresh } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import { FC, ReactElement, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { updateList } from '@/api/car';
import PageWrap from '@/components/base/PageWrap';
import Price from '@/components/base/Price';
import ProTable from '@/components/proTable/ProTable';
import { ProTableInstance } from '@/components/proTable/type';
import storage from '@/utils/storage';
import to from '@/utils/to';

type CarPageProps = any;
const CarPage: FC<CarPageProps> = (): ReactElement => {
  const [selectedRow, setSelectedRow] = useState<CarItem[]>([]);

  const ref = useRef<ProTableInstance<CarItem>>({});

  const updateRows = async () => {
    // const [err, res] = await to(
    //   updateList(
    //     selectedRow.map((item) => {
    //       return {
    //         ...item,
    //         inventoryTime: new Date('2022-03'),
    //       };
    //     }),
    //   ),
    // );

    const vals = ref.current.getData?.();

    console.log('👴2023-03-29 09:40:08 index.tsx line:17', vals);
  };

  return (
    <PageWrap>
      <ProTable<CarItem>
        request={'/car/list'}
        rowKey={'id'}
        showIndex
        activeRef={ref}
        toolButtons={[
          // <Button key={'update'} icon={<IconRefresh />} onClick={updateRows}>
          //   批量更新
          // </Button>,
          <Link to="/list/car/carAdd" key={'add'}>
            <Button type="primary" icon={<IconPlus />}>
              添加
            </Button>
          </Link>,
        ]}
        searchFormProps={{
          onValuesChange({ inventoryTime }) {
            if (inventoryTime) {
              storage.set('inventoryTime', inventoryTime);
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
          },
          {
            title: '品牌',
            dataIndex: 'brand',
            search: true,
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
          },
          {
            title: '优惠行情',
            dataIndex: 'discount',
            sorter: true,
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
          },
          {
            title: '购置税',
            dataIndex: 'purchaseTax',
          },
          {
            title: '落地价格',
            dataIndex: 'landingPrice',
            sorter: true,
            render(item) {
              return <Price price={item} />;
            },
            defaultSortOrder: 'ascend',
          },
        ]}
      />
    </PageWrap>
  );
};

export default CarPage;
