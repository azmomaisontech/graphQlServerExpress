import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../../context/GraphqlState";

interface PrivateProps extends RouteProps {
  component: React.FunctionComponent<any>;
}

const PrivateRoute: React.FC<PrivateProps> = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
