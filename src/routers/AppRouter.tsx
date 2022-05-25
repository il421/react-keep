import { createBrowserHistory, History } from "history";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { DashboardPage, NotFoundPage } from "../components/common";
import { LoginPage } from "../components/login/LoginPage";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { PathNames } from "./Routing";

export const history: History = createBrowserHistory();

export const AppRouter: React.FunctionComponent = (): JSX.Element => (
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
