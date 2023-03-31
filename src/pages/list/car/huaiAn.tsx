import * as echarts from 'echarts';
import { ReactElement } from 'react';

import PageWrap from '@/components/base/PageWrap';
import useEchart from '@/utils/hooks/useEcharts';

import huaiAn from './map.json';

echarts.registerMap('huaiAn', huaiAn as any);

function HAN(): ReactElement {
  const { wrapDom } = useEchart({
    options: {
      series: [
        {
          type: 'map',
          map: 'huaiAn',
          roam: false, // 不开启缩放和平移
          zoom: 1.2, // 视角缩放比例
          aspectScale: 0.9,
          label: {
            normal: {
              show: true,
              fontSize: '18',
              color: '#fff',
            },
            emphasis: {
              color: '#fff',
            },
          },
          itemStyle: {
            areaColor: 'rgba(41,72,118)', // 鼠标选择区域颜色
            borderColor: 'rgb(142,207,249)',
            borderWidth: 3,
            color: 'rgba(0,0,0,0)',
            borderType: 'solid',
            shadowBlur: 10,
            shadowColor: 'rgb(66,107,164)',
            shadowOffsetX: 20,
            shadowOffsetY: 20,
            emphasis: {
              // show: true,
              areaColor: '#FF6262', // 鼠标选择区域颜色
              shadowOffsetY: 5, // 关键在这
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          data: [
            {
              name: 'Hongze',
              lable1: '异常次数',
              value: '2000',
              lable2: '异常终端',
              numbar: '1000',
            },
          ],
        },
      ],
      visualMap: {
        min: 0, //最小值
        max: 1000, //最大值
        orient: 'vertical', //图例模式
        left: 26,
        bottom: 26,
        showLabel: true, //显示图例文本
        precision: 0, //数据展示无小数点
        itemWidth: 20, //图例宽度
        itemHeight: 15, //图例高度
        textGap: 10, //图例间距
        inverse: true, //数据反向展示
        hoverLink: false,
        inRange: {
          //选中图例后背景半透明
          color: ['rgba(3,4,5,0.4)'],
        },
        pieces: [
          {
            gt: 1001,
            label: '>1000次',
            color: '#7b1c1c',
          },
          {
            gte: 500,
            lte: 1000,
            label: '500-1000次',
            color: '#bd4141',
          },
          {
            gte: 100,
            lte: 499,
            label: '100-499次',
            color: '#e76262',
          },
          {
            gte: 10,
            lte: 99,
            label: '10-99次',
            color: '#ff9595',
          },
          {
            gte: 1,
            lte: 9,
            label: '1-9次',
            color: '#ffc1c1',
          },
          {
            lte: 0,
            label: '0次',
            color: '#ffe5e5',
          },
        ],
      },
    },
  });

  return (
    <PageWrap>
      <div
        ref={wrapDom}
        style={{
          height: 700,
        }}
      />
    </PageWrap>
  );
}
export default HAN;
