import React from "react";
import { WithStyles, Drawer } from "@material-ui/core";

import LHToolsCard from "./LHToolsCard";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";
import LHSeedSelect from "./LHSeedSelect";
import LHBuySellSelect from "./LHBuySellSelect";

type LHToolbarProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHToolbar: React.FunctionComponent<LHToolbarProps> = ({
  classes,
  currenttool,
}) => {
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

      {currenttool === "SEEDSELECT" && <LHSeedSelect />}
      {currenttool === "BUYSELL" && <LHBuySellSelect />}
    </Drawer>
  );
};

export default connector(wrapStyles(LHToolbar));
