import { DatePicker, Form, Input } from '@arco-design/web-react';
import { ReactElement } from 'react';

import { ProTableColumnProps } from './type';

type SearchFormItemProps<T> = ProTableColumnProps<T>;
function SearchFormItem<T>(props: SearchFormItemProps<T>): ReactElement {
  const { dataIndex, title, valueType } = props;

  let Com: any = Input;

  if (valueType === 'dateRange') {
    Com = DatePicker.RangePicker;
  }

  return (
    <Form.Item field={dataIndex} label={title}>
      <Com placeholder={props.title as string} />
    </Form.Item>
  );
}

export default SearchFormItem;
