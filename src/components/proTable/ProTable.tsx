import { Empty, PaginationProps, Table } from '@arco-design/web-react';
import { ReactElement, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { getContext } from '@/context/BaseContext';

import { DEFAULT_PAGE_SIZE, DEFAULT_REQUEST_DATE } from './defaultData';
import FormDrawer from './FormDrewer';
import {
  useFormDrawer,
  useTableColumns,
  useTableRequest,
  useTableSetting,
} from './hooks';
import styles from './index.module.less';
import SearchBar from './SearchBar';
import ToolBar from './ToolBar';
import { ProTableProps, SearchRef } from './type';

function ProTable<T = unknown>(props: ProTableProps<T>): ReactElement {
  const { columns = [], data = [], pagination = {}, activeRef, searchFormProps } = props;
  const [tableSize, setTableSize] = useState<'mini' | 'small' | 'default' | 'middle'>(
    'default',
  );

  const {
    defaultPageSize = DEFAULT_PAGE_SIZE,
    onChange: onPaginationChange,
    pageSize,
    current,
  } = pagination as PaginationProps;

  const defSorter = useMemo(() => {
    const f = columns.find((item) => item.defaultSortOrder);

    if (!f) {
      return '';
    }

    return `${f.dataIndex},${f.defaultSortOrder}`;
  }, [columns]);

  const ref: SearchRef<T> = useRef({
    pagination: {
      pageSize: pageSize || defaultPageSize || DEFAULT_PAGE_SIZE,
      current: current || 1,
    } as PaginationProps,
    searchValues: searchFormProps?.initialValues || ({} as Partial<T>),
    sorter: defSorter,
    filter: {},
  });
  const {
    data: _data = DEFAULT_REQUEST_DATE,
    run,
    loading,
  } = useTableRequest({
    ...props,
    searchRef: ref,
  });
  const formDrawerProps = useFormDrawer<T>({
    ...props,
    run,
  });

  const [_pagination, set_Pagination] = useState<PaginationProps>({
    pageSize: defaultPageSize,
    current: 1,
  });
  const tableSetting = useTableSetting<T>({
    size: tableSize,
    ...formDrawerProps,
    pagination: {
      ..._pagination,
      ...(props.pagination as PaginationProps),
    },
  } as any);

  const tableCols = useTableColumns(tableSetting._columns);

  const getData = () => {
    return _data.data || data;
  };

  // const handler = useRef<ProTableInstance<T>>({
  //   reload: run,
  //   getData() {
  //     return getData();
  //   },
  // });

  useImperativeHandle(activeRef, () => {
    return { getData };
  });

  return (
    <div className={`${styles['pro-table']}`}>
      <FormDrawer {...(formDrawerProps as any)} />
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
        openFormDrawerShow={formDrawerProps.openFormDrawerShow}
      />
      {columns?.length === 0 && <Empty description="need columns" />}

      <Table<T>
        rowKey="id"
        size={tableSize}
        loading={loading}
        onChange={(pagination, sorter, filter, { action }) => {
          console.log(action);
          if (action === 'filter') {
            ref.current.filter = filter;
            run();
          }

          if (action === 'sort') {
            const { direction, field } = sorter;

            if (field) {
              ref.current.sorter = direction
                ? `${field},${direction === 'ascend' ? 'ASC' : 'DESC'}`
                : '';
              run();
            }
          }
        }}
        {...props}
        data={_data?.data || data}
        columns={tableCols}
        pagination={{
          ..._pagination,
          showTotal: true,
          size: tableSize === 'middle' ? 'large' : tableSize,
          sizeCanChange: true,
          total: _data?.total || 0,
          ...(pagination as PaginationProps),
          onChange(current, size) {
            set_Pagination({
              ..._pagination,
              current: current,
              pageSize: size,
            });
            ref.current.pagination.pageSize = size;

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
