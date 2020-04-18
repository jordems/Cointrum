import React from "react";
import { WithStyles, Drawer, Divider } from "@material-ui/core";

import LHToolsCard from "./LHToolsCard";
import LHLabelsCard from "./LHLabelsCard";
import LHLabelDialog from "./LHLabelDialog";
import LHLabelNew from "./LHLabelNew";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

type LHToolbarProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHToolbar: React.FunctionComponent<LHToolbarProps> = ({ classes }) => {
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <LHToolsCard />

      <LHLabelsCard />

      <LHLabelDialog />
      <LHLabelNew />
    </Drawer>
  );
};

export default connector(wrapStyles(LHToolbar));
