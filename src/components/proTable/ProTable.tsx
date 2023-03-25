import { Empty, PaginationProps, Table } from '@arco-design/web-react';
import { ReactElement, useRef, useState } from 'react';

import { DEFAULT_PAGE_SIZE, DEFAULT_REQUEST_DATE } from './defaultData';
import { useTableColumns, useTableRequest, useTableSetting } from './hooks';
import styles from './index.module.less';
import SearchBar from './SearchBar';
import ToolBar from './ToolBar';
import { ProTableProps } from './type';

function ProTable<T = unknown>(props: ProTableProps<T>): ReactElement {
  const { columns = [], data = [], pagination = {}, showIndex } = props;

  const tableSetting = useTableSetting<T>(props);

  const tableCols = useTableColumns(tableSetting._columns);

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
  } = useTableRequest({
    request: props.request,
    searchRef: ref,
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
      <ToolBar<T>
        {...tableSetting}
        {...props}
        onRefresh={run}
        onTableSizeChange={setTableSize}
        tableSize={tableSize}
        refreshLoading={loading}
      />

      <Table<T>
        size={tableSize}
        loading={loading}
        {...props}
        data={_data?.data || data}
        columns={tableCols}
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
