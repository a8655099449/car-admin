import { userListAPI } from '@/api/user';
import ProTable from '@/components/proTable/ProTable';
import { FC, ReactElement } from 'react';

type UserListProps = any
const UserList: FC<UserListProps> = (): ReactElement => {
  return <div>

    <ProTable<UserInfo>
      request={async (q, s) => {

        const { data } = await userListAPI({
          ...q,
          ...s
        })

        return {
          data: data.items,
          success: true,
          total: data.total,
        }

      }}

      columns={[
        {
          title: "名字",
          dataIndex: "name",
        },
        {
          title: "注册时间",
          dataIndex: "createTime",
        }
      ]}
      rowKey={`id`}
      pagination={{
        pageSize: 5,
        current: 1
      }}
    />

  </div>;
};

export default UserList;