import { Message } from "@arco-design/web-react";
import axios from "axios";

import type { AxiosRequestConfig } from "axios";
const baseURL = `/api`;
function request<T = any>(
  config: AxiosRequestConfig & {
    cacheTime?: number; // 缓存时间 , 默认都有一分钟的缓存，如果不要缓存则写0
  }
): Promise<
  {
    code: number;
    data: T;
    [K: string]: any;
  } & T
> {
  const instance = axios.create({
    // 公用的网络请求路径
    baseURL: baseURL,
    // 网络请求时间超时会自动断开
    timeout: 10000,
    method: "get",
    withCredentials: true,
  });

  //  请求拦截
  instance.interceptors.request.use(
    //  请求前的拦截
    (config: AxiosRequestConfig) => {
      if (!config.params) {
        config.params = {};
      }
      config.params.timerstamp = Date.now();

      return config;
    },
    // 请求错误前的拦截
    (error) => {
      return Promise.reject(error?.response);
    }
  );

  // ! 响应拦截
  instance.interceptors.response.use(
    (res) => {
      if (res.data?.code === 200) {
      }

      return res.data;
    },
    (err) => {
      const msg = err.response?.data?.message;
      Message.error(msg);

      return Promise.reject(err?.response?.data || err);
    }
  );

  return instance(config) as any;
}

export default request;