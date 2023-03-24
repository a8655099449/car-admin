import { Empty, PaginationProps, Table, TableProps } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { ReactElement, useRef, useState } from 'react';

import { default as ajax } from '@/utils/request';
import to from '@/utils/to';

import { DEFAULT_PAGE_SIZE, DEFAULT_REQUEST_DATE } from './defaultData';
import { useTableSetting } from './hooks';
import styles from './index.module.less';
import SearchBar from './SearchBar';
import ToolBar from './ToolBar';
import { ProTableProps, TableRequest } from './type';

function ProTable<T = unknown>(props: ProTableProps<T>): ReactElement {
  const { columns = [], data = [], request, pagination = {} } = props;

  const tableSetting = useTableSetting<T>(columns);

  const { defaultPageSize = DEFAULT_PAGE_SIZE, onChange: onPaginationChange } =
    pagination as PaginationProps;

  const ref = useRef({
    pagination: pagination as PaginationProps,
    searchValues: {} as Partial<T>,
  });

  const {
    data: _data = DEFAULT_REQUEST_DATE,
    run,
    loading,
  } = useRequest(async () => {
    let _request: TableRequest<T> = undefined;

    if (typeof request === 'string') {
      _request = async (params, searchValues) => {
        const res = await ajax<Pagination<T>>({
          url: request,
          method: 'GET',
          params: { ...params, ...searchValues },
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
          page: ref.current.pagination.current || 1,
          pageSize: ref.current.pagination.pageSize || defaultPageSize || 10,
        },
        ref.current.searchValues,
      ),
    );

    if (err) {
      return DEFAULT_REQUEST_DATE;
    }

    return res;
  });

  const [_pagination, set_Pagination] = useState<PaginationProps>({
    pageSize: defaultPageSize,
    current: 1,
  });

  const [tableSize, setTableSize] = useState<'mini' | 'small' | 'default' | 'middle'>(
    'default',
  );

  return (
    <div className={`${styles['pro-table']}`}>
      {columns?.length === 0 && <Empty description="need columns" />}
      <SearchBar<T>
        {...props}
        onSearch={(e) => {
          ref.current.searchValues = e;
          ref.current.pagination.current = 1;
          set_Pagination({
            current: 1,
          });
          run();
        }}
      />
      <ToolBar
        onRefresh={run}
        onTableSizeChange={setTableSize}
        tableSize={tableSize}
        {...(tableSetting as any)}
      />

      <Table<T>
        size={tableSize}
        loading={loading}
        {...props}
        data={_data?.data || data}
        columns={tableSetting._columns}
        pagination={{
          ..._pagination,

          total: _data?.total || 0,
          ...(pagination as PaginationProps),
          onChange(current, size) {
            set_Pagination({
              ..._pagination,
              current: current,
            });
            onPaginationChange?.(current, size);
            ref.current.pagination.current = current;
            run();
          },
        }}
      />
    </div>
  );
}

export default ProTable;
