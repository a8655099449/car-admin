import { Button, Form, Input, Space } from '@arco-design/web-react';
import { IconDown, IconUp } from '@arco-design/web-react/icon';
import { ReactElement, useMemo, useState } from 'react';

import styles from './index.module.less';
import { ProTableProps } from './type';

const Col = ({ className = '', children }) => {
  return <div className={`${styles['search-item']} ${className}`}>{children}</div>;
};

function SearchBar<T = unknown>(props: ProTableProps<T>): ReactElement {
  const { columns = [], onSearch } = props;
  const _columns = useMemo(() => {
    return columns.filter((item) => item.search);
  }, [columns]);

  const [form] = Form.useForm<T>();

  const submit = () => {
    search();
  };

  const onReset = () => {
    form.resetFields();
    search();
  };

  const search = () => {
    console.log('👴2023-03-24 16:35:08 SearchBar.tsx line:31', form.getFieldsValue());
    onSearch?.(form.getFieldsValue());
  };

  const [open, setOpen] = useState(false);
  if (_columns.length === 0) {
    return <></>;
  }

  return (
    <div>
      <Form<T>
        form={form}
        className={`${styles['search-bar']} ${styles['row-' + (_columns.length % 3)]}   `}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        {_columns.map((item, index) => {
          const isHide = index > 4 && !open;

          return (
            <Col key={item.dataIndex} className={`${isHide ? styles['hide'] : ''}`}>
              <Form.Item label={item.title} field={item.dataIndex}>
                <Input placeholder={item.title as string} />
              </Form.Item>
            </Col>
          );
        })}

        <Col className={`${styles['button-wrap']}`}>
          <Space>
            <Button type="primary" onClick={submit}>
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
            {_columns.length > 5 && (
              <Button type="text" onClick={() => setOpen(!open)}>
                {open ? (
                  <>
                    收起
                    <IconUp />
                  </>
                ) : (
                  <>
                    展开
                    <IconDown />
                  </>
                )}
              </Button>
            )}
          </Space>
        </Col>
      </Form>
    </div>
  );
}

export default SearchBar;
