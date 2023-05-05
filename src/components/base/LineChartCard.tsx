import { Card } from '@arco-design/web-react';
import * as echarts from 'echarts';
import { ReactElement, useEffect, useMemo } from 'react';

import useEchart from '@/utils/hooks/useEcharts';

type LineChartCardProps = Partial<{
  title: string;
  xData: any[];
  yData: any[];
  areaColor: string;
}>;
function LineChartCard({
  title,
  xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  yData = [820, 932, 901, 934, 1290, 1330, 1320],
  areaColor = '58,77,233',
}: LineChartCardProps): ReactElement {
  const ops = useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: {
          interval: 0, //强制文字产生间隔
          rotate: xData.length > 5 ? 45 : 0, //旋转角度
        },
        boundaryGap: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      yAxis: {
        type: 'value',
        min: Math.min(...yData) - 500 < 0 ? 0 : Math.min(...yData) - 500,
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: `rgba(${areaColor},1)`,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `rgba(${areaColor},0.8)`,
              },
              {
                offset: 1,
                color: `rgba(${areaColor},0.3)`,
              },
            ]),
          },
        },
      ],
    };
  }, [xData, yData]);

  const { wrapDom } = useEchart({
    ...{
      options: { ...ops },
    },
  });

  return (
    <Card title={title || '卡片详情'}>
      <div
        ref={wrapDom}
        style={{
          height: 500,
        }}
      />
    </Card>
  );
}
export default LineChartCard;
