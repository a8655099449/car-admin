import { userListAPI } from '@/api/user';
import ProTable from '@/components/proTable/ProTable';
import { FC, ReactElement } from 'react';

type UserListProps = any
const UserList: FC<UserListProps> = (): ReactElement => {
  return <div>

    <ProTable

      request={() => userListAPI({})}

    />

  </div>;
};

export default UserList;