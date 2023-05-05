import { Descriptions, Grid, Image, Spin } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import LineChartCard from '@/components/base/LineChartCard';
import PageWrap from '@/components/base/PageWrap';
import request from '@/utils/request';
import { useQuery } from '@/utils/use';

interface RequestData {
  icon: string;
  brandName: string;
  image: string;
  id: number;
  name: string;
  items: Item[];
  saleCount: number;
  guidePrice: number;
  landingPrice: number;
}

interface Item {
  saleCount: number;
  guidePrice: number;
  landingPrice: number;
  discount: number;
  inventoryTime: string;
  nakedPrice: number;
}

const CardDetail = () => {
  const { modelId } = useQuery();

  console.log('👴2023-04-26 10:32:48 cardDetail.tsx line:8', modelId);

  const { data, loading } = useRequest(async () =>
    request<RequestData>({
      url: '/car/modelDetails',
      params: { modelId },
    }),
  );

  const _data = useMemo(() => {
    return {
      ...data?.data,
      items:
        data?.data?.items?.map((item) => {
          item.inventoryTime = dayjs(item.inventoryTime).format(`YYYY年MM月`);
          return item;
        }) || [],
    };
  }, [data]);
  console.log('👴2023-04-29 11:40:52 cardDetail.tsx line:40', _data);

  return (
    <PageWrap title={_data?.name} showTitle>
      <Spin
        loading={loading}
        style={{
          width: '100%',
        }}
      >
        <div
          className="flex-between"
          style={{
            justifyContent: 'flex-start',
            width: '100%',
            paddingLeft: 100,
          }}
        >
          <div>
            <Image src={_data?.image} />
          </div>

          <div
            style={{
              paddingLeft: 150,
            }}
          >
            <Descriptions
              column={1}
              data={[
                {
                  label: '厂商',
                  value: (
                    <div className="flex-center">
                      {_data?.icon && (
                        <img
                          src={_data?.icon}
                          alt={_data.brandName}
                          style={{
                            width: 30,
                            height: 30,
                            marginRight: 5,
                          }}
                        />
                      )}
                      {_data?.brandName}
                    </div>
                  ),
                },
                {
                  label: '月均销量',
                  value: _data?.saleCount,
                },
                {
                  label: '厂商推荐价',
                  value: _data?.guidePrice,
                },
                {
                  label: '月均落地价格',
                  value: _data?.landingPrice,
                },
              ]}
              border
            />
          </div>
        </div>

        <Grid.Row gutter={24}>
          <Grid.Col span={12} style={{ marginBottom: 20 }}>
            <LineChartCard
              title="优惠价格走势"
              xData={_data?.items.map((item) => item.inventoryTime)}
              yData={_data?.items.map((item) => item.discount * -1)}
              areaColor="1, 145, 252"
            />
          </Grid.Col>
          <Grid.Col span={12} style={{ marginBottom: 20 }}>
            <LineChartCard
              title="销量走势"
              xData={_data?.items.map((item) => item.inventoryTime)}
              yData={_data?.items.map((item) => item.saleCount)}
            />
          </Grid.Col>
          <Grid.Col span={12} style={{ marginBottom: 20 }}>
            <LineChartCard
              title="裸车价格"
              xData={_data?.items.map((item) => item.inventoryTime)}
              yData={_data?.items.map((item) => item.nakedPrice)}
              areaColor="228, 68, 44"
            />
          </Grid.Col>
          <Grid.Col span={12} style={{ marginBottom: 20 }}>
            <LineChartCard
              title="落地价格"
              xData={_data?.items.map((item) => item.inventoryTime)}
              yData={_data?.items.map((item) => item.landingPrice)}
              areaColor="62, 131, 241"
            />
          </Grid.Col>
        </Grid.Row>
      </Spin>
    </PageWrap>
  );
};

export default CardDetail;
