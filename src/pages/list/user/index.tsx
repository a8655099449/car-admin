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
            title: '是否为管理员',
            dataIndex: 'isAdmin',
            options: [
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ],
            valueType: 'select',
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
        baseRequestUrl="/user"
        hideToolButtons={['add']}
      />
    </PageWrap>
  );
};

export default UserList;
