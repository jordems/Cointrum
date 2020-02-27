import React from "react";
import { Route, Redirect } from "react-router-dom";

interface AdaptiveRouteProps {
  requiresAuth?: boolean;
  path?: string | string[] | undefined;
  exact?: boolean;
  component?: any;
}

/**
 * @param requiresAuth Route requires user to be authenticated.
 * @param path String of text after url to get to component.
 * @param exact Path must be exact.
 * @param component React component that will be rendered when at specified route.
 *
 */
class AdaptiveRoute extends React.Component<AdaptiveRouteProps> {
  render() {
    const { requiresAuth, path, component, exact } = this.props;

    // TODO Check User Login State
    const userAuthed = false;

    // User Attempting to Load Page that Reqires signin
    if (requiresAuth && !userAuthed) {
      return <Redirect to="/" />;
    }

    return <Route path={path} exact={exact} component={component} />;
  }
}

export default AdaptiveRoute;
