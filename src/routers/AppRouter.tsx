import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory, History } from "history";

import LoginPage from "../components/login/LoginPage";
import { DashboardPage } from "../components/common";
import NotFoundPage from "../components/common/NotFoundPage";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { PathNames } from "./Routing";

export const history: History = createBrowserHistory();

const AppRouter: React.FunctionComponent = (): JSX.Element => (
  <Router history={history}>
    <>
      <Switch>
        <PublicRouter path="/" component={LoginPage} exact={true} />
        <PrivateRouter path={PathNames.base} component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  </Router>
);

export default AppRouter;
