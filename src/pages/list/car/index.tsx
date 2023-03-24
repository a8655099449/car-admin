import { Drawer } from '@arco-design/web-react';
import { FC, ReactElement } from 'react';

import PageWrap from '@/components/base/PageWrap';
import ProTable from '@/components/proTable/ProTable';

import CreateList from './CreateList';

type CarPageProps = any;
const CarPage: FC<CarPageProps> = (): ReactElement => {
  return (
    <PageWrap>
      <Drawer>
        <CreateList />
      </Drawer>

      <ProTable<CarItem>
        request={'/car/list'}
        rowKey={'id'}
        columns={[
          {
            title: 'id',
            dataIndex: 'id',
          },
          {
            title: '盘点时间',
            dataIndex: 'inventoryTime',
          },
          {
            title: '销量',
            dataIndex: 'saleCount',
          },
          {
            title: '型号',
            dataIndex: 'model',
          },
          {
            title: '指导价',
            dataIndex: 'guidePrice',
          },
          {
            title: '优惠行情',
            dataIndex: 'discount',
          },
          {
            title: '裸车价',
            dataIndex: 'nakedPrice',
          },
          {
            title: '保险',
            dataIndex: 'insurance',
          },
          {
            title: '购置税',
            dataIndex: 'purchaseTax',
          },
          {
            title: '落地价格',
            dataIndex: 'landingPrice',
          },
        ]}
      />
    </PageWrap>
  );
};

export default CarPage;
