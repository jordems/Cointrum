import React from "react";

import { WithStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import { styles, wrapStyles } from "./styles";

type AppbarProps = WithStyles<typeof styles>;

const Appbar: React.FunctionComponent<AppbarProps> = ({ classes }) => {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Cointrum
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default wrapStyles(Appbar);
