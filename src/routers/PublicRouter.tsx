import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Store } from "../store/store.types";
import { PathNames } from "./Routing";

interface PublicRouterProps {
  isAuthenticated: boolean;
  component: React.ElementType;
  path: string;
  exact: boolean;
}

const PublicRouter: React.FunctionComponent<PublicRouterProps> = ({isAuthenticated, component: Component, ...rest}) => (
  <Route {...rest} component={(props: any) => (
    isAuthenticated ? (
      <Redirect to={PathNames.base} />
    ) : (
      <Component {...props} />
    )
  )}/>
);

const mapStateToProps = (state: Store) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRouter);
