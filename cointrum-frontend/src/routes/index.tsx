import React from "react";
import { Switch } from "react-router-dom";

import AdativeRoute from "routes/AdaptiveRoute";

import home from "pages/home";
import creationhub from "pages/creationhub";
import profile from "pages/profile";
import page404 from "pages/404";

export default function Routes() {
  return (
    <Switch>
      <AdativeRoute path="/" exact component={home} disableLayout />
      <AdativeRoute path="/creation-hub" component={creationhub} />
      <AdativeRoute path="/profile" component={profile} requiresAuth />
      <AdativeRoute component={page404} />
    </Switch>
  );
}
