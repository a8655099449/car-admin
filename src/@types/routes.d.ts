import * as Icon from '@arco-design/web-react/icon';

type IconKeys = keyof typeof Icon;

declare global {
  type RouteItem = {
    name: string;
    path: string;
    component?: any;
    children?: RouteItem[];
    icon?: IconKeys | React.ReactElement;
    hideInMenu?: boolean;
    breadcrumb?: boolean;
    auth?: string[];
  };
}
