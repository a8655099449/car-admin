import { Button, Modal, ModalProps, Space } from '@arco-design/web-react';
import React from 'react';
import { ReactElement } from 'react';

import useBatchUpdate from './useBatchUpdate';

type BatchUpdateProps = ReturnType<typeof useBatchUpdate>;
function BatchUpdate({ batchShow, close }: BatchUpdateProps): ReactElement {
  return (
    <Modal title="批量更新" visible={batchShow} onCancel={close}>
      <Space>
        <Button type="primary">品牌</Button>
      </Space>
    </Modal>
  );
}
export default BatchUpdate;
