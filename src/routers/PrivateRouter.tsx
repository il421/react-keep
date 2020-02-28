import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Store} from "../store/store.types";

interface PrivateRouterProps {
  isAuthenticated: boolean;
  component: React.ElementType;
  path: string,
}

export const PrivateRouter: React.FunctionComponent<PrivateRouterProps> = ({
  isAuthenticated,
  component: Component,
  ...rest}) => (
  <Route {...rest} component={(props: any) => (
    isAuthenticated ? (
      <div>
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

const mapStateToProps = (state: Store) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRouter);
