const routes: RouteItem[] = [
  {
    component: "@/pages/home",
    key: `home`,
    name: "首页",
  },
  {
    key: `list`,
    name: "列表",
    children: [
      {
        path: "/list/user",
        name: "用户列表",
        key: "list/user",
      },
      {
        path: "/list/car",
        name: "百车盘点",
        key: "list/car",
      },
    ],
  },
 
];

export default routes;
