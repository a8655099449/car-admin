import { Button, ButtonProps } from '@arco-design/web-react';
import { ReactElement, useState } from 'react';

function WaitButton(props: ButtonProps): ReactElement {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      {...props}
      loading={loading}
      onClick={async (e) => {
        try {
          setLoading(true);
          props?.onClick?.(e);
        } finally {
          setLoading(false);
        }
      }}
    />
  );
}
export default WaitButton;
