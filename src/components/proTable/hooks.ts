import { useMemo, useState } from 'react';

import { ProTableColumnProps } from './type';

export const useTableSetting = <T>(cols: ProTableColumnProps<T>[]) => {
  const _selectCols = useMemo(() => {
    return cols.map((col) => {
      return {
        label: col.title,
        value: col.dataIndex,
      };
    });
  }, [cols]);

  const [selectCols, setSelectCols] = useState(_selectCols.map((col) => col.value));

  const _columns = useMemo(() => {
    return cols.filter((col) => selectCols.includes(col.dataIndex));
  }, [selectCols, cols]);

  return { selectCols, setSelectCols, options: _selectCols, _columns };
};
