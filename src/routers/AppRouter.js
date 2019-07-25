import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import LoginPage from '../components/login/LoginPage';
import DashboardPage from '../components/common/DashboardPage';
import NotFoundPage from '../components/common/NotFoundPage';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={ history }>
    <>
      <Switch>
        <PublicRouter path="/" component={ LoginPage } exact={ true } />
        <PrivateRouter path="/dashboard" component={ DashboardPage } />
        <Route component={ NotFoundPage } />
      </Switch>
    </>
  </Router>
);


export default AppRouter;
