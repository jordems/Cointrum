import React from "react";
import { WithStyles, Drawer } from "@material-ui/core";

import LHToolsCard from "./LHToolsCard";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";
import LHSeedSelect from "./LHSeedSelect";

type LHToolbarProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHToolbar: React.FunctionComponent<LHToolbarProps> = ({
  classes,
  seedtool,
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

      {/*TODO ADD a LHBuySellCard (for selecting seeds for buy/sell) */}

      {seedtool === "SEEDSELECT" && <LHSeedSelect />}
    </Drawer>
  );
};

export default connector(wrapStyles(LHToolbar));
