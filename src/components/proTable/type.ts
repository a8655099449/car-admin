import {
  FormProps,
  PaginationProps,
  SelectProps,
  TableProps,
} from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { ReactElement } from 'react';

type RequestParams = {
  page: number;
  pageSize: number;
};

type ColumnValueType =
  | 'text'
  | 'dateRange'
  | 'dateMonth'
  | 'number'
  | 'radioButton'
  | 'select'
  | 'image';
// ColumnProps 参数

type ReverseStringNumber<T> = T extends string ? number : string;

export type ProTableColumnProps<T> = ColumnProps<T> &
  Partial<{
    search: boolean;
    valueType: ColumnValueType;
    hideInHandleForm: boolean; // 在操作的表单中隐藏
    formProps?: Partial<
      {
        required?: boolean;
      } & SelectProps
    >;
    options: {
      label: any;
      value: any;
    }[];
  }>;

export type TableSize = 'default' | 'mini' | 'small' | 'middle';

export type requestSorter = {
  [k in string]: 'ascend' | 'descend' | undefined;
};

export type HandleOptions = {
  url?: string;
  method?: 'post' | 'get' | 'delete' | 'put';
};

//  table的请求参数
export type TableRequest<T> =
  | ((
      params: RequestParams,
      searchParams: Partial<T>,
      sorter: string,
      filter: any,
    ) => Promise<{
      data: T[];
      success: boolean;
      total: number;
    }>)
  | undefined;

// table的Props
export type ProTableProps<T = unknown> = Omit<TableProps<T>, 'columns'> &
  Partial<{
    request: TableRequest<T> | string;
    columns: ProTableColumnProps<T>[];
    onSearch(params: Partial<T>): void;
    showIndex: boolean; // 是否显示序号
    showHandle: boolean; // 是否显示操作
    toolButtons: ReactElement[]; // 工具栏按钮
    title: string | ReactElement; // 表格标题
    onSearchValuesChange: (current: Partial<T>, searchValues: Partial<T>) => void;
    activeRef: React.MutableRefObject<ProTableInstance<T>>; // 可以获得实例的有些方法
    searchFormProps: FormProps<T>;
    method: 'get' | 'post';
    onEditRow(t: T): void;
    onDeleteRow(t: T): void;
    update?: HandleOptions;
    deleteOptions?: HandleOptions;
    addOptions?: HandleOptions;
    queryPageOptions?: HandleOptions;
    baseRequestUrl?: string;
    handleFormProps: FormProps<T>;
    hideToolButtons: Array<'reload' | 'resize' | 'ctrlRows' | 'add'>;
  }>;

export type SearchRef<T> = React.MutableRefObject<{
  pagination: PaginationProps;
  searchValues: Partial<T>;
  sorter: string;
  filter: any;
}>;

export type ProTableInstance<T = unknown> = Partial<{
  getData: () => T[];
  reload: () => void;
}>;

export type Option = {
  value: any;
  label: any;
};
