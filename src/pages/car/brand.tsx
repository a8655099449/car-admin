import { Image } from '@arco-design/web-react';
import { ReactElement } from 'react';

import PageWrap from '@/components/base/PageWrap';
import ProTable from '@/components/proTable/ProTable';
import { carMakeOptions } from '@/utils/enums';

function Brand(): ReactElement {
  const search = true;
  return (
    <PageWrap>
      <ProTable<BrandItem>
        title={'品牌管理'}
        columns={[
          {
            dataIndex: 'name',
            title: '名称',
            formProps: {
              required: true,
            },
            search,
          },
          {
            dataIndex: 'icon',
            title: '图标',
            formProps: {},
            valueType: 'image',
            render(src) {
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
                    src={src}
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
            dataIndex: 'make',
            title: '类型',
            valueType: 'radioButton',
            options: carMakeOptions,
            formProps: {
              required: true,
            },
            search,
          },
        ]}
        showHandle
        baseRequestUrl="/car/brand"
        handleFormProps={{
          initialValues: {
            make: 'China',
          },
        }}
        showIndex
        rowKey={'id'}
      />
    </PageWrap>
  );
}
export default Brand;
