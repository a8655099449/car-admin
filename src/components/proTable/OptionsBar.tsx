import { ReactElement, useMemo } from 'react';

import { Option } from './type';

type OptionsBarProps = {
  options?: Option[];
  value: any;
};
function OptionsBar({ options = [], value }: OptionsBarProps): ReactElement {
  const optionsMap = useMemo(() => {
    const obj: {
      [k in string]: any;
    } = {};

    options.forEach((item) => {
      obj[item.value] = item.label;
    });
    return obj;
  }, []);

  return <>{optionsMap[value] || '-'}</>;
}
export default OptionsBar;
