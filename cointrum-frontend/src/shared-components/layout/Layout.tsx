import React from "react";

import { WithStyles } from "@material-ui/core";
import { styles, wrapStyles } from "./styles";

import Toolbar from "./toolbar/Toolbar";
import Appbar from "./appbar/Appbar";

type LayoutProps = WithStyles<typeof styles>;

const Layout: React.FunctionComponent<LayoutProps> = ({
  classes,
  children
}) => {
  return (
    <div className={classes.root}>
      <Toolbar />
      <Appbar />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default wrapStyles(Layout);
