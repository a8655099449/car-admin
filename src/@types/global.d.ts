type Lang = "zh-CN" | "en-US";

type Locale = {
  [k in Lang]: {
    [key in string]: string;
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
  theme: "dark" | "light";
  collapsed: boolean;
};
interface Pagination<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
