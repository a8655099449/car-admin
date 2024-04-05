import { Layout, Menu, Message } from '@arco-design/web-react';
import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import styles from './layout.module.less';

const { Sider, Content } = Layout;
const { Item: MenuItem, SubMenu } = Menu;
import * as Icon from '@arco-design/web-react/icon';

const { IconMenuUnfold, IconMenuFold } = Icon;

// import{  } from "./components/BaseContext";
import lazyload from '@/components/lazyload';
import NavBar from '@/components/NavBar';
import { getContext } from '@/context/BaseContext';

import routes from '../config/routes';
import Auth from './components/Auth';
import { useListenRoute } from './hooks';
import getFlattenRoutes from './loadRoute';

const isArray = Array.isArray;

const getMenuIcon = (icon: unknown) => {
  let Com: ReactElement = <>{icon}</>;
  if (typeof icon === 'string') {
    if (Icon[icon]) {
      const I = Icon[icon];
      Com = (
        <>
          <I />
        </>
      );
    }
  }

  return Com;
};

const BaseLayout = (): ReactElement => {
  const _routes = useMemo<RouteItem[]>(() => {
    return getFlattenRoutes(routes);
  }, []);
  const { pathname } = useLocation();

  const { userInfo } = getContext();
  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());

  const { setting, setSetting } = getContext();
  const { collapsed } = setting;

  const { selectKeys, openKeys, setOpenKeys } = useListenRoute();

  function renderRoutes() {
    routeMap.current.clear();
    const nodes: any[] = [];
    function travel(_routes: RouteItem[], level: number, parentNode: any[] = []) {
      return _routes.map((route) => {
        const { breadcrumb = true, hideInMenu, path, auth } = route;
        if (hideInMenu) return null;

        if (path === '/list' && !userInfo.isAdmin) {
          return null;
        }

        if (auth && !auth.some((item) => userInfo.auth?.includes(item))) {
          return null;
        }

        const iconDom = getMenuIcon(route.icon);
        const titleDom = (
          <>
            {iconDom} {route.name}
          </>
        );
        if (
          route.component &&
          (!isArray(route.children) ||
            (isArray(route.children) && !route.children.length))
        ) {
          routeMap.current.set(route.path, breadcrumb ? [...parentNode, route.name] : []);

          if (level > 1) {
            return (
              <MenuItem key={route.path}>
                <Link to={`${route.path}`}>{titleDom}</Link>
              </MenuItem>
            );
          }
          nodes.push(
            <MenuItem key={route.path}>
              <Link to={`${route.path}`}>{titleDom}</Link>
            </MenuItem>,
          );
        }
        if (isArray(route.children) && route.children.length) {
          const parentNode: any[] = [];
          if (iconDom.props.isIcon) {
            parentNode.push(iconDom);
          }

          if (level > 1) {
            return (
              <SubMenu key={route.path} title={titleDom}>
                {travel(route.children, level + 1, [...parentNode, route.name])}
              </SubMenu>
            );
          }
          nodes.push(
            <SubMenu key={route.path} title={titleDom}>
              {travel(route.children, level + 1, [...parentNode, route.name])}
            </SubMenu>,
          );
        }
      });
    }
    travel(routes, 1);
    return nodes;
  }

  if (!userInfo.id) {
    Message.warning('请先进行登录');
    return <Redirect to={`/login?redirect=${pathname}`} />;
  }

  return (
    <>
      <NavBar />
      <Layout className={`${styles['layout']}`}>
        <Sider collapsed={collapsed} className={`${styles['sider']}`}>
          <Menu
            openKeys={openKeys}
            collapse={collapsed}
            onClickSubMenu={(key, openKeys) => {
              setOpenKeys(openKeys);
            }}
            selectedKeys={selectKeys}
          >
            {renderRoutes()}
          </Menu>
          <button
            className={`${styles['collapsed-btn']}`}
            onClick={() => setSetting({ ...setting, collapsed: !collapsed })}
          >
            {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
          </button>
        </Sider>

        <Content
          style={{
            backgroundColor: `var(--color-bg-3)`,
            padding: 16,
          }}
        >
          <Auth>
            <Switch>
              {_routes.map(({ component, path }) => {
                return <Route key={path} path={path} component={component} exact />;
              })}

              <Route exact path="/">
                <Redirect to={`/home`} />
              </Route>

              <Route exact path="*" component={lazyload(() => import(`../pages/404`))} />
            </Switch>
          </Auth>
        </Content>
      </Layout>
    </>
  );
};

export default BaseLayout;
