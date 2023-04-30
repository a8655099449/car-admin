import { Card } from '@arco-design/web-react';
import { ReactElement, useEffect, useMemo } from 'react';

import useEchart from '@/utils/hooks/useEcharts';

type LineChartCardProps = Partial<{
  title: string;
  xData: any[];
  yData: any[];
}>;
function LineChartCard({
  title,
  xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  yData = [820, 932, 901, 934, 1290, 1330, 1320],
}: LineChartCardProps): ReactElement {
  const ops = useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true,
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
