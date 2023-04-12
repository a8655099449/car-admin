type Lang = 'zh-CN' | 'en-US';

type Locale = {
  [k in Lang]: {
    [key in string]: unknown;
  };
};

type UserInfo = {
  account?: string;
  password?: string;
  auth?: string[];
  remember?: boolean;
  name?: string;
  id?: number;
  email?: string;
};
type SettingOptions = {
  themeColor: string;
  lang: Lang;
  theme: 'dark' | 'light';
  collapsed: boolean;
};
interface Pagination<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @name CarItem 车辆信息
 * @description 车辆信息 包含 盘点时间 车型 主流型号 指导价格 价优惠行情价格 裸车价格 保险 购置税 落地行情价
 */

type CarItem = {
  id: number;
  inventoryTime: string | Date; // 盘点时间
  brand: string; // 品牌
  saleCount: number; // 销量
  model: string; // 型号
  guidePrice: number; // 指导价
  discount: number; // 优惠行情价
  nakedPrice: number; // 裸车价
  insurance: number; // 保险
  purchaseTax: number; // 购置税
  landingPrice: number; // 落地行情价
};

namespace window {
  const BMapGL: unknown;
  const BMapLib: unknown;
}
interface BrandItem {
  id: number;
  createTime: string;
  updateTime: string;
  icon: string;
  name: string;
  make: string;
}

interface Model {
  id: number;
  createTime: string;
  updateTime: string;
  image: string;
  name: string;
  brandId: number;
  brand: BrandItem;
  type: 'sedan' | 'suv';
}
