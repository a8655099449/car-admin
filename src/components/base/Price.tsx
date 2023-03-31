import { Tag } from '@arco-design/web-react';
import { ReactElement, useMemo } from 'react';

type PriceProps = {
  price: number;
  decimal?: number;
  unit?: 1000 | 10000;
};
function Price({ price, unit = 10000, decimal = 2 }: PriceProps): ReactElement {
  const text = useMemo(() => {
    const _text = (price / unit).toFixed(decimal);

    return _text.replace(/\.?0+$/, '') + (unit === 10000 ? 'w' : 'k');
  }, [price, unit]);

  return <Tag>{text}</Tag>;
}
export default Price;
