import { FC, ReactElement, useMemo } from 'react';
import { ProTableProps } from './type';
import { Button, Form, Grid, Input, Space } from '@arco-design/web-react';
import styles from './index.module.less';


const Col = ({ children }) => {

  return <div className={`${styles['search-item']}`}>{children}</div>

}

function SearchBar<T = any>(props: ProTableProps<T>): ReactElement {
  const { columns = [], onSearch } = props
  const _columns = useMemo(() => {
    return columns.filter((item) => item.search || item.search === undefined)
  }, [columns])

  const [form] = Form.useForm<T>()

  const submit = () => {
    search()
  }

  const onReset = () => {
    form.resetFields()
    search()
  }

  const search = () => {
    onSearch?.(form.getFieldsValue())
  }

  return <div >

    <Form<T>
      form={form}
      className={`${styles['search-bar']}`}

    >

      {
        _columns.map((item) => {
          return <Col key={item.dataIndex}>
            <Form.Item label={item.title} field={item.dataIndex}>
              <Input placeholder={item.title as string} />
            </Form.Item>
          </Col>
        })
      }

      <Col  >
        <Space >
          <Button type='primary' onClick={submit}>搜索</Button>
          <Button onClick={onReset}>重置</Button>
        </Space>
      </Col>

    </Form>

  </div>;
};

export default SearchBar;