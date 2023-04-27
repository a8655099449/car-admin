import {
  Button,
  Empty,
  Grid,
  Image,
  Input,
  PageHeader,
  Pagination,
  Radio,
  Space,
  Spin,
} from '@arco-design/web-react';
import CardComponent from '@arco-design/web-react/es/Card';
import { IconArrowFall, IconArrowRise } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import PageWrap from '@/components/base/PageWrap';
import Price from '@/components/base/Price';
import request from '@/utils/request';

interface DataItem {
  image: string;
  modelId: number;
  name: string;
  count: number;
  max: number;
  min: number;
  saleCount: number;
  avg: number;
}

function Card(): ReactElement {
  interface Params {
    orderValue: 'ASC' | 'DESC';
    orderKey: string;
    name: string;
    page: number;
    // [key: string]: any;
  }

  const [params, setParams] = useState<Params>({
    orderValue: 'ASC' as 'ASC' | 'DESC',
    orderKey: 'avg',
    name: '',
    page: 1,
  });
  const changeParams = (key: keyof typeof params, value: any) => {
    params[key] = value as never;

    if (key !== 'page') {
      params.page = 1;
    }

    setParams({ ...params });
    run();
  };

  const { data, loading, run } = useRequest(() => {
    const { name, page } = params;
    return request<Pagination<DataItem>>({
      url: '/car/carCard',
      params: {
        pageSize: 12,
        sorter: `${params.orderKey},${params.orderValue}`,
        name,
        page,
      },
    });
  });

  return (
    <PageWrap>
      <PageHeader
        title="百车盘点"
        extra={
          <Space>
            <Input.Search
              defaultValue={params.name}
              placeholder="输入车名"
              onSearch={(e) => {
                changeParams('name', e);
              }}
            />
            <Radio.Group
              mode="fill"
              type="button"
              value={params.orderKey}
              onChange={(e) => changeParams('orderKey', e)}
            >
              <Radio value="avg">价格</Radio>
              <Radio value="saleCount">销量</Radio>
            </Radio.Group>

            <Button
              type="primary"
              icon={params.orderValue !== 'ASC' ? <IconArrowFall /> : <IconArrowRise />}
              onClick={() =>
                changeParams('orderValue', params.orderValue === 'ASC' ? 'DESC' : 'ASC')
              }
            >
              {params.orderValue === 'ASC' ? '升序' : '降序'}
            </Button>
          </Space>
        }
      />
      <Spin
        loading={loading}
        style={{
          width: '100%',
        }}
      >
        <div
          style={{
            padding: 20,
            width: '100%',
          }}
        >
          {data?.data.items.length === 0 ? (
            <div className="flex-center" style={{ paddingTop: 50 }}>
              <Empty description="无数据" />
            </div>
          ) : (
            <div>
              <Grid.Row gutter={24}>
                {data?.data.items.map((item) => {
                  return (
                    <Grid.Col
                      key={item.modelId}
                      span={6}
                      style={{
                        marginBottom: 20,
                      }}
                    >
                      <CardComponent
                        title={item.name}
                        extra={
                          <Link to={`/car/cardDetail?modelId=${item.modelId}`}>
                            <Button type="text">详情</Button>
                          </Link>
                        }
                      >
                        <Image src={item.image} />

                        <div>
                          <p
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <b>价格：</b> <Price price={item.min} /> -{' '}
                            <Price price={item.max} />
                          </p>
                          <div className="flex-between">
                            <p>
                              <b>盘点次数：</b>
                              {item.count}
                            </p>
                            <p>
                              <b>月均销量：</b>
                              {item.saleCount}
                            </p>
                          </div>
                        </div>
                      </CardComponent>
                    </Grid.Col>
                  );
                })}
              </Grid.Row>

              <div className="flex-center">
                <Pagination
                  total={data?.data.total}
                  current={params.page}
                  onChange={(p) => {
                    changeParams('page', p);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Spin>
    </PageWrap>
  );
}
export default Card;
