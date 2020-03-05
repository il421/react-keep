import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Store } from "../store/store.types";
import { RouterStateProps } from "./PublicRouter";

interface PrivateRouterProps {
  component: React.ElementType;
  path: string;
}

type Prop = PrivateRouterProps & RouterStateProps;

export const PrivateRouter: React.FunctionComponent<Prop> = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props: any) =>
      isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state: Store): RouterStateProps => ({
  isAuthenticated: !!state.auth.uid
});

export default connect<RouterStateProps, {}, PrivateRouterProps, Store>(
  mapStateToProps
)(PrivateRouter);
