import { Button, Space } from '@arco-design/web-react';
import { FC, ReactElement } from 'react';

import { userListAPI } from '@/api/user';
import PageWrap from '@/components/base/PageWrap';
import ProTable from '@/components/proTable/ProTable';

type UserListProps = any;
const UserList: FC<UserListProps> = (): ReactElement => {
  return (
    <PageWrap>
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
            search: true,
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            search: true,
          },
          {
            title: '注册时间',
            dataIndex: 'createTime',
            search: true,
            valueType: 'dateRange',
            hideInHandleForm: true,
          },
        ]}
        rowKey={`id`}
        showHandle
      />
    </PageWrap>
  );
};

export default UserList;
