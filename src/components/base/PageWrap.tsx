import { Breadcrumb } from '@arco-design/web-react';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

type PageWrapProps = Partial<{
  title: ReactElement | string;
  breadcrumb: {
    title: string;
    link: string;
  }[];
  showTitle: boolean;
  headExtra: ReactElement;
}>;
const PageWrap: FC<PageWrapProps> = ({
  children,
  breadcrumb,
  title,
  showTitle,
  headExtra,
}): ReactElement => {
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
      {breadcrumb && (
        <div style={{ marginBottom: 10 }} className="flex-between">
          <Breadcrumb>
            {breadcrumb.map((item) => (
              <Breadcrumb.Item key={item.link}>
                <Link to={item.link}>{item.title}</Link>
              </Breadcrumb.Item>
            ))}
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
          <div>{headExtra}</div>
        </div>
      )}

      {showTitle && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default PageWrap;
