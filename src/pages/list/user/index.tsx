import { Button, Space } from '@arco-design/web-react';
import { FC, ReactElement } from 'react';

import { userListAPI } from '@/api/user';
import ProTable from '@/components/proTable/ProTable';

type UserListProps = any;
const UserList: FC<UserListProps> = (): ReactElement => {
  return (
    <div>
      <ProTable<UserInfo>
        request={async (q, s) => {
          const { data } = await userListAPI({
            ...q,
            ...s,
          });
          return {
            data: data.items,
            success: true,
            total: data.total,
          };
        }}
        columns={[
          {
            title: '名字',
            dataIndex: 'name',
          },
          {
            title: '注册时间',
            dataIndex: 'createTime',
          },
          {
            title: '操作',
            search: false,
            render(col, item, index) {
              return (
                <Space key={item.id}>
                  <Button type="text">编辑</Button>
                  <Button type="text">删除</Button>
                </Space>
              );
            },
          },
        ]}
        rowKey={`id`}
        pagination={{
          pageSize: 10,
          current: 1,
        }}
      />
    </div>
  );
};

export default UserList;
