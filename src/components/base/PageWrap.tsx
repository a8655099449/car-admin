import { FC, ReactElement } from 'react';

type PageWrapProps = any
const PageWrap: FC<PageWrapProps> = ({children}): ReactElement => {
   return <div className='base-page-wrap'>{children}</div>;
};

export default PageWrap;