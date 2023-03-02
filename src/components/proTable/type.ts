import { TableProps } from "@arco-design/web-react";
import { ColumnProps } from "@arco-design/web-react/es/Table";

type RequestParams = {
  page: number;
  pageSize: number;
};

export type ProTableColumnProps<T> = ColumnProps<T> &
  Partial<{
    search: boolean;
  }>;

export type ProTableProps<T = any> = Omit<TableProps<T>, "columns"> &
  Partial<{
    request?(
      params: RequestParams,
      searchParams: Partial<T>
    ): Promise<{
      data: T[];
      success: boolean;
      total: number;
    }>;
    columns: ProTableColumnProps<T>[];
    onSearch(params: Partial<T>): void;
  }>;
