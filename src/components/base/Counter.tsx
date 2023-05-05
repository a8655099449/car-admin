/*
 * @Author: kw
 * @LastEditors: pzm
 * @Descripttion: 数字滚动方法
 * @params:
 * @Date: 2022-09-19 17:55:55
 * @LastEditTime: 2022-11-16 14:09:10
 */
import { CountUp } from 'countup.js';
import type { FC, ReactElement } from 'react';
import { useEffect, useRef } from 'react';

interface IProps {
  count: number;
  decimalPlaces?: number; // 显示小数位数，默认为0，不显示小数，会以四舍五入为单位
  separator?: string; // 千位分隔符 默认为没有。比如传入','的表现 : 1000 => 1,000
  duration?: number; // 动画时间，秒为单位 默认为2s
}
const Counter: FC<IProps> = ({
  count = 0,
  decimalPlaces = 0,
  separator = '',
  duration = 2,
}): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef<CountUp>();

  useEffect(() => {
    const counter = new CountUp(ref.current as HTMLDivElement, count, {
      decimalPlaces,
      separator,
      duration,
    });
    // counter.start();
    instance.current = counter;
  }, []);

  useEffect(() => {
    if (instance.current) {
      instance.current.update(count);
    }
  }, [instance, count]);

  return <span ref={ref} />;
};

export default Counter;
