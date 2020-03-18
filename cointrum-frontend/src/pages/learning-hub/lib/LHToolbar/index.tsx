import React from "react";
import { WithStyles, Drawer, Divider } from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import LHToolsCard from "./LHToolsCard";

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
        paper: classes.drawerPaper
      }}
      anchor="right"
    >
      <LHToolsCard />
      <Divider />
      <div>
        List of Labels and seeds under label, removeable and add icon to create
        label
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId={"1"} label="test">
          <TreeItem nodeId={"2"} label="test1" />
        </TreeItem>
      </TreeView>
    </Drawer>
  );
};

export default connector(wrapStyles(LHToolbar));
