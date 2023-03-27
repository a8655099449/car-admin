import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import React, { createContext, FC, ReactElement, useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import routes from '@/config/routes';

import { TUseRoutes, useRoutes } from './useRoute';
import useSetting, { UseSetting } from './useSetting';
import { UserHooks, userHooks } from './useUserInfo';

export type CtxProps = UseSetting & UserHooks & TUseRoutes;
const Context = createContext<CtxProps>({} as CtxProps);
export const getContext = (): CtxProps => useContext(Context);

const getRouteMap = () => {
  const object = {};
  const loop = (rs: RouteItem[]) => {
    rs.forEach((r) => {
      object[r.path] = r;
      if (r.children) {
        loop(r.children);
      }
    });
  };
  loop(routes);

  return object;
};

const routeMap = getRouteMap();

const BaseContext = ({ children }): ReactElement => {
  const p = useSetting();
  const lang = p.setting.lang;
  const u = userHooks();

  const r = useRoutes();

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    return routeMap?.[pathname]?.name || '404';
  }, [pathname]);

  return (
    <Context.Provider value={{ ...p, ...u, ...r }}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <ConfigProvider locale={getArcoLocale()}>{children}</ConfigProvider>
    </Context.Provider>
  );
};

export default BaseContext;
