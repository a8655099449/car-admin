import { Avatar, Card, Divider, Grid, List } from '@arco-design/web-react';
import {
  IconApps,
  IconCalendarClock,
  IconCheckSquare,
} from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import React from 'react';

import Counter from '@/components/base/Counter';
import PageWrap from '@/components/base/PageWrap';
import useEchart from '@/utils/hooks/useEcharts';
import request from '@/utils/request';

import SaleCountTop from './SaleCountTop';

const OneCard = ({ title, icon, unit = '次', count = 0 }) => {
  return (
    <div
      className="flex-between"
      style={{
        flex: 1,
        paddingLeft: 20,
      }}
    >
      <div
        style={{
          width: 80,
          backgroundColor: 'var(--color-fill-2)',
          borderRadius: `50%`,
          height: 80,
        }}
        className="flex-center"
      >
        {icon}
      </div>
      <div
        style={{
          width: 'calc(100% - 120px)',
        }}
      >
        <h3>{title}</h3>
        {/* <Counter count={666} /> */}
        <p>
          <Counter count={count} />
          <span style={{ marginLeft: 5 }}>{unit}</span>
        </p>
      </div>
    </div>
  );
};

interface HomeData {
  counts: Counts;
  saleCountTop: SaleCountTop[];
  makeCount: MakeCount[];
  discountTop: DiscountTop[];
}

interface DiscountTop {
  discount: number;
  name: string;
  inventoryTime: string;
  image: string;
}

interface MakeCount {
  make: string;
  count: number;
}

interface SaleCountTop {
  saleCount: number;
  modelId: number;
  name: string;
  image: string;
}

interface Counts {
  months: number;
  models: number;
  stat: number;
}

const Home = () => {
  const { data } = useRequest(() => request<HomeData>({ url: '/car/home' }));

  const { wrapDom } = useEchart({
    options: {
      polar: {
        radius: [30, '80%'],
      },
      angleAxis: {
        startAngle: 75,
      },
      radiusAxis: {
        type: 'category',
        data: data?.data.makeCount.map((item) => item.make),
      },
      tooltip: {},

      series: {
        type: 'bar',
        data: data?.data.makeCount.map((item) => item.count),
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: '{b}: {c}款',
        },
        colorBy: 'data',
      },
      legend: {
        left: '10',
      },
    },
  });

  return (
    <PageWrap title={`百车盘点`} showTitle>
      <Divider />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <OneCard
          title={`盘点月数`}
          icon={
            <IconCalendarClock
              style={{
                color: '#33ac5c',
                fontSize: 50,
              }}
            />
          }
          unit="月"
          count={data?.data.counts.months}
        />
        <Divider type="vertical" style={{ marginRight: 150, height: 60 }} />
        <OneCard
          title={`统计车型`}
          icon={
            <IconCheckSquare
              style={{
                color: '#3f83f0',
                fontSize: 50,
              }}
            />
          }
          unit="款"
          count={data?.data.counts.models}
        />
        <Divider type="vertical" style={{ marginRight: 150, height: 60 }} />
        <OneCard
          title={`盘点次数`}
          icon={
            <IconApps
              style={{
                color: '#4cb7f7',
                fontSize: 50,
              }}
            />
          }
          unit="次"
          count={data?.data.counts.stat}
        />
      </div>
      <SaleCountTop
        data={data?.data.saleCountTop.map((item) => ({
          value: item.saleCount,
          name: item.name,
        }))}
      />
      <div style={{ marginTop: 20, display: 'flex' }}>
        <Card title="历史优惠最高" style={{ flex: 1, marginRight: 20 }}>
          <div>
            <List
              dataSource={data?.data.discountTop}
              render={(item, index) => (
                <List.Item key={item.name}>
                  <div className="flex-between">
                    <List.Item.Meta
                      avatar={<Avatar shape="square">{index + 1}</Avatar>}
                      title={item.name}
                      description={
                        <span>
                          <span>{dayjs(item.inventoryTime).format('YYYY年MM月')} </span>
                          {'优惠10w'}
                        </span>
                      }
                    />
                    <div>
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: 100,
                        }}
                      />
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Card>
        <Card title="车型分布" style={{ flex: 1 }}>
          <div
            style={{
              height: 996,
            }}
            ref={wrapDom}
          />
        </Card>
      </div>
    </PageWrap>
  );
};

export default Home;
