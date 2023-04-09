import { useRequest } from 'ahooks';
import { ReactElement } from 'react';

import PageWrap from '@/components/base/PageWrap';
import ProTable from '@/components/proTable/ProTable';
import request from '@/utils/request';

function Model(): ReactElement {
  const required = true;

  const { data } = useRequest(() =>
    request<Pagination<BrandItem>>({
      url: '/car/brand/queryPage',
      params: {
        page: 1,
        pageSize: 200,
      },
    }),
  );

  return (
    <PageWrap>
      <ProTable<Model>
        title={'车系管理'}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            formProps: {
              required,
            },
          },
          {
            title: '图片',
            dataIndex: 'image',
          },
          {
            title: '车辆品牌',
            dataIndex: 'brandId',
            options: data?.data.items.map((item) => ({
              value: item.id,
              label: item.name,
            })),
            valueType: 'select',
            formProps: {
              required,
            },
            render(_, item) {
              return item.brand?.name;
            },
          },
        ]}
        showHandle
        baseRequestUrl="/car/model"
      />
    </PageWrap>
  );
}
export default Model;
