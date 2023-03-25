import { Button, Form, Input, Space } from '@arco-design/web-react';
import { IconDown, IconUp } from '@arco-design/web-react/icon';
import { ReactElement, useMemo, useState } from 'react';

import styles from './index.module.less';
import SearchFormItem from './SearchFormItem';
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
    const values = form.getFieldsValue();
    console.log('👴2023-03-25 11:03:53 SearchBar.tsx line:33', values);

    Object.keys(values).forEach((key) => {
      if (typeof values[key] === 'string') {
        values[key] = values[key].trim();
      }
      if (Array.isArray(values[key])) {
        values[key] = values[key].join(',');
      }
    });

    // values

    onSearch?.(values);
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
              <SearchFormItem<T> {...item} />
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
