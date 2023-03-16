import { Empty, PaginationProps, Table, TableProps } from '@arco-design/web-react';
import Search from '@arco-design/web-react/es/Input/search';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { useRequest } from 'ahooks';
import { FC, ReactElement, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { ProTableProps } from './type';





function ProTable<T = any>(props: ProTableProps<T>): ReactElement {

  const { columns = [], data = [], request, pagination = {} } = props
  const { defaultPageSize, onChange: onPaginationChange } = pagination as PaginationProps

  const ref = useRef({
    pagination: pagination as PaginationProps,
    searchValues: {} as Partial<T>
  })


  const { data: _data, run, loading } = useRequest(async () => {

    const res = await request?.({
      page: ref.current.pagination.current || 1,
      pageSize: ref.current.pagination.pageSize || defaultPageSize || 10,
    }, ref.current.searchValues)
    return res
  })

  const [_pagination, set_Pagination] = useState<PaginationProps>({
    pageSize: defaultPageSize || 10,
    current: 1
  });


  return <div>
    {columns?.length === 0 && <Empty
      description="need columns"
    />}
    <SearchBar<T> {...props}
      onSearch={e => {
        ref.current.searchValues = e
        ref.current.pagination.current = 1
        set_Pagination({
          current: 1,
        })
        run()
      }}
    />

    <Table<T>
      loading={loading}
      {...props}
      data={_data?.data || data}
      columns={columns}
      pagination={{
        ..._pagination,

        total: _data?.total || 0,
        ...pagination as PaginationProps,
        onChange(current, size) {
          set_Pagination({
            ..._pagination,
            current: current
          })
          onPaginationChange?.(current, size)
          ref.current.pagination.current = current
          run()
        },
      }}
    />
  </div>;
};

export default ProTable;