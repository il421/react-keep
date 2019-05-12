import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

//can access history everythere
export const history = createHistory();

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
        <PublicRouter path="/" component={ LoginPage } exact={ true } />>
        <PrivateRouter path="/dashboard" component={ DashboardPage } />
        <Route component={ NotFoundPage } />
      </Switch>
    </div>
  </Router>
);
// path, component, exact (tell router not to match paths if true)
// :id save a paramentr in match/params

export default AppRouter;