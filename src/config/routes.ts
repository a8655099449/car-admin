const routes: RouteItem[] = [
  {
    path: '/home',
    name: '首页',
    icon: 'IconApps',
  },
  {
    path: '/message/hotMessage',
    name: '热点消息',
    icon: 'IconApps',
  },
  {
    path: '/message/addMessage',
    name: '发布文章',
    icon: 'IconApps',
    hideInMenu: true,
  },
  {
    path: '/message/detail',
    name: '文章详情',
    icon: 'IconApps',
    hideInMenu: true,
  },
  {
    path: '/list',
    name: '用户管理',
    icon: 'IconList',
    children: [
      {
        path: '/list/user',
        name: '用户列表',
        icon: 'IconUserGroup',
      },
    ],
  },
  {
    path: '/car',
    name: '百车盘点',
    icon: 'IconCompass',
    children: [
      {
        path: '/car',
        name: '按月盘点',
        icon: 'IconSend',
      },
      {
        path: '/car/carAdd',
        name: '新增',
        hideInMenu: true,
      },
      {
        path: '/car/brand',
        name: '品牌管理',
        icon: 'IconBrush',
      },

      {
        path: '/car/model',
        name: '车系管理',
        icon: 'IconBrush',
      },
      {
        path: '/car/card',
        name: '车辆卡片',
        icon: 'IconIdcard',
      },
      {
        path: '/car/cardDetail',
        name: '车辆卡片',
        icon: 'IconIdcard',
        hideInMenu: true,
      },
    ],
  },
];

export default routes;
