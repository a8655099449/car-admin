import { Image } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { ReactElement, useMemo } from 'react';

import PageWrap from '@/components/base/PageWrap';
import ProTable from '@/components/proTable/ProTable';
import { carTypeOptions } from '@/utils/enums';
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
  const { data: brandTexts } = useRequest(() =>
    request<{ brand: string }[]>({
      url: '/car/brandText',
    }),
  );

  return (
    <PageWrap>
      <ProTable<Model>
        title={'车系管理'}
        columns={[
          {
            title: '车标',
            dataIndex: 'brandImage',
            hideInHandleForm: true,
            render(src, item) {
              return (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    padding: 3,
                    backgroundColor: '#eee',
                  }}
                >
                  <Image
                    src={item.brand.icon}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              );
            },
          },

          {
            title: '名称',
            dataIndex: 'name',
            formProps: {
              required,
            },
            search: true,
            render(col) {
              return col;
            },
          },
          {
            title: '图片',
            dataIndex: 'image',
            render(col, item, index) {
              return (
                <Image
                  src={col}
                  style={{
                    width: 150,
                    height: 100,
                  }}
                />
              );
            },
          },
          {
            title: '车辆品牌',
            dataIndex: 'brandId',
            options: data?.data.items.map((item) => ({
              value: item.id,
              label: item.name,
            })),
            valueType: 'radioButton',
            formProps: {
              required,
              allowCreate: true,
            },
            render(_, item) {
              return item.brand?.name;
            },
            // search: true,
          },
          {
            title: '类型',
            dataIndex: 'type',
            valueType: 'radioButton',
            options: carTypeOptions,
            search: true,
          },
        ]}
        showHandle
        baseRequestUrl="/car/model"
        handleFormProps={{
          initialValues: {
            type: 'sedan',
          },
        }}
      />
    </PageWrap>
  );
}
export default Model;
