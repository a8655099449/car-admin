import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from '@arco-design/web-react';
import { ReactElement } from 'react';

import { ProTableColumnProps } from './type';

type SearchFormItemProps<T> = ProTableColumnProps<T> & {
  onEnter?: () => void;
  type?: 'search' | 'edit';
};
function SearchFormItem<T>(props: SearchFormItemProps<T>): ReactElement {
  const { dataIndex, title, valueType, onEnter, type = 'search', formProps = {} } = props;
  let { required } = formProps;
  if (type === 'search') {
    required = false;
  }

  let Com: any = Input;
  const otherProps: any = {};

  if (valueType === 'dateRange') {
    Com = DatePicker.RangePicker;
  }

  if (valueType === 'dateMonth') {
    Com = DatePicker.MonthPicker;
  }
  if (valueType === 'number') {
    Com = InputNumber;
  }
  if (valueType === 'select') {
    otherProps.options = props.options;
    Com = Select;
  }
  if (valueType === 'radioButton') {
    Com = Radio.Group;
    otherProps.options = props.options;
    otherProps.type = 'button';
  }

  return (
    <Form.Item
      field={dataIndex}
      label={title}
      required={required}
      rules={[
        {
          required,
          message: props.title + '为必填项',
        },
      ]}
    >
      <Com
        {...otherProps}
        placeholder={props.title as string}
        onPressEnter={() => {
          onEnter?.();
        }}
      />
    </Form.Item>
  );
}

export default SearchFormItem;
