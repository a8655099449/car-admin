import { Badge } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { default as ajax } from '@/utils/request';
import to from '@/utils/to';

import { DEFAULT_PAGE_SIZE, DEFAULT_REQUEST_DATE } from './defaultData';
import { ProTableColumnProps, ProTableProps, SearchRef, TableRequest } from './type';
// useTableSetting 内置的一些setting操作
export function useTableSetting<T>(props: ProTableProps<T>) {
  const { columns = [], showIndex, pagination } = props;

  console.log('👴2023-03-28 15:17:12 hooks.tsx line:16', pagination);
  const cols = useMemo(() => {
    const _columns = columns;

    if (showIndex && !_columns.some((item) => item.dataIndex === 'TableIndex')) {
      _columns.unshift({
        dataIndex: 'TableIndex',
        title: '序号',
        render(_, item, index) {
          const rank = index + 1;

          const rankColorMap = {
            1: {
              bg: 'rgb(var(--primary-6))',
            },
            2: {
              bg: 'rgb(var(--primary-5))',
            },
            3: {
              bg: 'rgb(var(--primary-4))',
            },
            4: {
              bg: 'rgb(var(--primary-3))',
            },
            5: {
              bg: 'rgb(var(--primary-2))',
            },
          };

          return (
            <Badge
              count={rank}
              dotStyle={{
                backgroundColor: rankColorMap[rank]?.bg || 'rgb(var(--primary-2))',
                color: '#fff',
              }}
            />
          );
        },
      });
    }

    return _columns;
  }, [columns]);

  const _selectCols = useMemo(() => {
    return cols.map((col) => {
      return {
        label: col.title,
        value: col.dataIndex,
      };
    });
  }, [cols]);

  const [selectCols, setSelectCols] = useState(_selectCols.map((col) => col.value));

  const _columns = useMemo(() => {
    return cols.filter((col) => selectCols.includes(col.dataIndex));
  }, [selectCols, cols]);

  return { selectCols, setSelectCols, options: _selectCols, _columns };
}

// useTableColumns 主要作用是修改Table的columns的渲染方式
export function useTableColumns<T>(cols: ProTableColumnProps<T>[]) {
  const _columns = useMemo(() => {
    const _cols = cols?.map((col) => {
      const { valueType, render } = col;

      if (!render && valueType === 'dateRange') {
        col.render = (value) => {
          return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        };
      }
      if (!render && valueType === 'dateMonth') {
        col.render = (value) => {
          return dayjs(value).format('YYYY年MM月');
        };
      }

      return col;
    });

    return _cols;
  }, [cols]);

  return _columns;
}

export function useTableRequest<T>(params: {
  request: TableRequest<T> | string;
  searchRef: SearchRef<T>;
}) {
  const { request, searchRef } = params;

  return useRequest(async () => {
    let _request: TableRequest<T> = undefined;

    if (typeof request === 'string') {
      _request = async (params, searchValues, sorter) => {
        const res = await ajax<Pagination<T>>({
          url: request,
          method: 'GET',
          params: { ...params, ...searchValues, sorter },
        });
        return {
          data: res.data.items,
          success: true,
          total: res.data.total,
        };
      };
    } else if (typeof request === 'function') {
      _request = request;
    }
    if (!_request) {
      return DEFAULT_REQUEST_DATE;
    }

    const [err, res] = await to(
      _request?.(
        {
          page: searchRef.current.pagination.current || 1,
          pageSize: searchRef.current.pagination.pageSize || DEFAULT_PAGE_SIZE,
        },
        searchRef.current.searchValues,
        searchRef.current.sorter,
      ),
    );

    if (err) {
      return DEFAULT_REQUEST_DATE;
    }

    return res;
  });
}
