import { Drawer, Form } from '@arco-design/web-react';
import { ReactElement } from 'react';

import { useFormDrawer } from './hooks';
import SearchFormItem from './SearchFormItem';

function FormDrawer<T>(props: ReturnType<typeof useFormDrawer>): ReactElement {
  const {
    formDrawerShow,
    fromDrawerInstance,
    mode,
    handleConfirm,
    close,
    formColumns,
    handleFormProps,
  } = props;

  return (
    <Drawer
      visible={formDrawerShow}
      onCancel={close}
      width={800}
      onOk={handleConfirm}
      title={mode === 'add' ? '添加' : '编辑'}
    >
      <Form<T> {...handleFormProps} form={fromDrawerInstance as any}>
        {formColumns?.map((item) => (
          <SearchFormItem
            {...item}
            key={item.dataIndex}
            type="edit"
            onEnter={handleConfirm}
          />
        ))}
      </Form>
    </Drawer>
  );
}
export default FormDrawer;
