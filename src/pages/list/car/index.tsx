import { FC, ReactElement } from 'react';
import CreateList from './CreateList';
import { Drawer } from '@arco-design/web-react';

type CarPageProps = any
const CarPage: FC<CarPageProps> = (): ReactElement => {
  return <div>
    <Drawer>
      <CreateList />
    </Drawer>

  </div>;
};

export default CarPage;