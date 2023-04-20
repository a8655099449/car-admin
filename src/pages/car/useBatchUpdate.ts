import { useState } from 'react';
const useBatchUpdate = () => {
  const [batchShow, setBatchShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CarItem[]>([]);

  const open = () => {
    setBatchShow(true);
  };

  const close = () => {
    setBatchShow(false);
  };

  return { batchShow, close, open, selectedRow, setSelectedRow };
};

export default useBatchUpdate;
