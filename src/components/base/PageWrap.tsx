import { FC, ReactElement } from 'react';

type PageWrapProps = any;
const PageWrap: FC<PageWrapProps> = ({ children }): ReactElement => {
  return (
    <div
      className="base-page-wrap"
      style={{
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        padding: 10,
        background: 'var(--color-bg-2)',
        minHeight: `calc(100vh - 104px)`,
      }}
    >
      {children}
    </div>
  );
};

export default PageWrap;
