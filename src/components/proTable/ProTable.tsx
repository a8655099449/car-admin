import { Empty, Table, TableProps } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { FC, ReactElement } from 'react';





type ProTableProps = TableProps & {
  request?(): Promise<any>
}
const ProTable: FC<ProTableProps> = (props): ReactElement => {

  const { columns = [], data = [], request } = props

  const { data: _data } = useRequest(async () => request?.(),)
  console.log('👴2023-03-01 17:30:06 ProTable.tsx line:17', _data)

  return <div>
    {columns?.length === 0 && <Empty
      description="need columns"
    />}

    <Table {...props}
      data={data}
      columns={columns}
    />
  </div>;
};

export default ProTable;