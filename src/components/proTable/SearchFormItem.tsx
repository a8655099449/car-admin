import { DatePicker, Form, Input } from '@arco-design/web-react';
import { ReactElement } from 'react';

import { ProTableColumnProps } from './type';

type SearchFormItemProps<T> = ProTableColumnProps<T> & {
  onEnter?: () => void;
};
function SearchFormItem<T>(props: SearchFormItemProps<T>): ReactElement {
  const { dataIndex, title, valueType, onEnter } = props;

  let Com: any = Input;

  if (valueType === 'dateRange') {
    Com = DatePicker.RangePicker;
  }

  if (valueType === 'dateMonth') {
    Com = DatePicker.MonthPicker;
  }

  return (
    <Form.Item field={dataIndex} label={title}>
      <Com
        placeholder={props.title as string}
        onPressEnter={() => {
          onEnter?.();
        }}
      />
    </Form.Item>
  );
}

export default SearchFormItem;
