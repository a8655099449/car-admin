import { FormProps, PaginationProps, TableProps } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { ReactElement } from 'react';

type RequestParams = {
  page: number;
  pageSize: number;
};

type ColumnValueType = 'text' | 'dateRange' | 'dateMonth';
// ColumnProps 参数
export type ProTableColumnProps<T> = ColumnProps<T> &
  Partial<{
    search: boolean;
    valueType: ColumnValueType;
  }>;

export type TableSize = 'default' | 'mini' | 'small' | 'middle';

export type requestSorter = {
  [k in string]: 'ascend' | 'descend' | undefined;
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
