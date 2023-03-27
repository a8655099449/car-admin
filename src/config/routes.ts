const routes: RouteItem[] = [
  {
    path: '/home',
    name: '首页',
    icon: 'IconApps',
  },
  {
    path: '/list',
    name: '列表',
    icon: 'IconList',
    children: [
      {
        path: '/list/user',
        name: '用户列表',
        icon: 'IconUserGroup',
      },
      {
        path: '/list/car',
        name: '百车盘点',
        icon: 'IconSend',
      },
      {
        path: '/list/car/carAdd',
        name: '新增',
        hideInMenu: true,
      },
    ],
  },
];

export default routes;
