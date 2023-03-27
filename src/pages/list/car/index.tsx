import { Button, Drawer } from '@arco-design/web-react';
import { IconPlus, IconRobotAdd } from '@arco-design/web-react/icon';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import PageWrap from '@/components/base/PageWrap';
import ProTable from '@/components/proTable/ProTable';

import CreateList from './carAdd';

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
        showIndex
        toolButtons={[
          <Link to="/list/car/carAdd" key={'add'}>
            <Button type="primary" icon={<IconPlus />}>
              添加
            </Button>
          </Link>,
        ]}
        title={'百车盘点'}
        columns={[
          {
            title: '盘点时间',
            dataIndex: 'inventoryTime',
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
