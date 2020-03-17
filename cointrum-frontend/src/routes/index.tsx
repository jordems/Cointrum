import React from "react";
import { Switch } from "react-router-dom";

import AdativeRoute from "routes/AdaptiveRoute";

import home from "pages/home";
import profile from "pages/profile";
import maps from "pages/maps";
import learninghub from "pages/learning-hub";

import page404 from "pages/404";

export default function Routes() {
  return (
    <Switch>
      <AdativeRoute path="/" exact component={home} />
      <AdativeRoute path="/profile" component={profile} requiresAuth />
      <AdativeRoute path="/maps" component={maps} requiresAuth />
      <AdativeRoute path="/learning-hub" component={learninghub} requiresAuth />
      <AdativeRoute component={page404} />
    </Switch>
  );
}
