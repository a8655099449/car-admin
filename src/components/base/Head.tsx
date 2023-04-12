import { ReactElement } from 'react';
import RHead from 'react-helmet';

function Head({ children }): ReactElement {
  return <RHead>{children}</RHead>;
}
export default Head;
