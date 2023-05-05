import { Card } from '@arco-design/web-react';
import { ReactElement } from 'react';

import useEchart from '@/utils/hooks/useEcharts';

type SaleCountTopProps = {
  data?: {
    name: string;
    value: number;
  }[];
};
function SaleCountTop({ data = [] }: SaleCountTopProps): ReactElement {
  const { wrapDom } = useEchart({
    options: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: data.map(({ name }) => name),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 200000,
        },
      ],
      series: [
        {
          name: '销量',
          type: 'bar',
          barWidth: '60%',
          data: data.map(({ value }) => value),
          colorBy: 'data',
        },
      ],
    },
  });

  return (
    <Card
      title="累计销量top10"
      style={{
        marginTop: 20,
      }}
    >
      <div
        ref={wrapDom}
        style={{
          height: 350,
        }}
      />
    </Card>
  );
}
export default SaleCountTop;
