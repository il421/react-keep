import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { Store } from "../store/store.types";
import { PathNames } from "./Routing";

interface PublicRouterProps {
  component: React.ElementType;
  path: string;
  exact: boolean;
}

export interface RouterStateProps {
  isAuthenticated: boolean;
}

type Prop = PublicRouterProps & RouterStateProps;

const PublicRouterBase: React.FunctionComponent<Prop> = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props: any) =>
      isAuthenticated ? (
        <Redirect to={PathNames.base} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state: Store): RouterStateProps => ({
  isAuthenticated: !!state.auth.uid
});

export const PublicRouter = connect<
  RouterStateProps,
  {},
  PublicRouterProps,
  Store
>(mapStateToProps)(PublicRouterBase);
