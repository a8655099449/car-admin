/*
 * @Author: hekun hekun@chinasoftinc.com
 * @LastEdit: ximenkun
 * @params:
 * @FilePath: \antae-web\src\utils\useEcharts.ts
 * @Date: 2022-11-15 10:36:19
 * @Descripttion: 公共函数 页面渲染echarts
 */
import type { ECharts } from 'echarts';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

type useEchartProps = {
  options: any;
  onCreateInstance?: (e: ECharts) => void; // 创建实例的回调
  manual?: boolean; // 是否手动去设置options
  isRate?: boolean; // 是否支持x轴倾斜
};

const useEchart = ({
  options = {},
  onCreateInstance,
  manual = false,
}: useEchartProps) => {
  const instance = useRef<ECharts>();
  const wrapDom = useRef<HTMLDivElement>(null);
  const ref = useRef({
    options: {} as any,
    isRender: false,
  });

  const resize = () => instance.current?.resize();

  const refresh = () => {
    instance.current?.setOption({ ...ref.current.options });
    if (!ref.current.isRender) {
      setTimeout(() => {
        ref.current.isRender = true;
      }, 1000);
    }
  };
  useEffect(() => {
    if (!wrapDom.current) {
      return;
    }
    const echartInstance = echarts.init(wrapDom.current) as ECharts;

    instance.current = echartInstance;

    if (!manual) {
      ref.current.options = options;
      refresh();
    }
    onCreateInstance?.(echartInstance);

    const ro = new ResizeObserver(() => {
      console.log(`resize`);
      if (!ref.current.isRender) {
        return;
      }

      resize();
    });
    ro.observe(wrapDom.current);

    return () => {
      instance.current?.dispose();
      ro.disconnect();
    };
  }, [wrapDom]);

  useEffect(() => {
    console.log('👴useEffect', options.xAxis.data, instance.current);

    if (instance.current) {
      ref.current.options = { ...options };
      refresh();
    }
  }, [options, instance]);
  return {
    wrapDom,
    instance,
    refresh,
  };
};

export default useEchart;
