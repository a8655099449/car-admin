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
  isRate = false,
}: useEchartProps) => {
  const instance = useRef<ECharts>();
  const wrapDom = useRef<HTMLDivElement>(null);

  const resize = () => instance.current?.resize();

  const refresh = () => {
    instance.current?.setOption(isRate ? options : options);
  };
  useEffect(() => {
    if (!wrapDom.current) {
      return;
    }
    setTimeout(() => {
      if (!wrapDom.current) {
        return;
      }
      const echartInstance = echarts.init(wrapDom.current) as ECharts;

      if (!manual) {
        echartInstance.setOption(isRate ? options : options);
      }
      instance.current = echartInstance;
      if (!manual) {
        refresh();
      }
      onCreateInstance?.(echartInstance);
      window.addEventListener('resize', resize);
    }, 50);

    const ro = new ResizeObserver(() => {
      instance.current?.resize();
    });
    ro.observe(wrapDom.current);

    return () => {
      window.removeEventListener('resize', resize);
      instance.current?.dispose();
      ro.disconnect();
    };
  }, [wrapDom]);

  useEffect(() => {
    if (instance.current && !manual) {
      refresh();
    }
  }, [instance, manual, refresh]);

  return {
    wrapDom,
    instance,
    refresh,
  };
};

export default useEchart;
