import './global.less';
import '@arco-design/web-react/dist/css/arco.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BaseContext from './context/BaseContext';
import BaseLayout from './Layout';
import exportPage from './pages/export';
import login from './pages/login';

const App = () => {
  return (
    <BrowserRouter>
      <BaseContext>
        <Switch>
          <Route path={`/login`} component={login} />
          <Route path={`/export`} component={exportPage} />
          <Route path={`/`} component={BaseLayout} />
        </Switch>
      </BaseContext>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
