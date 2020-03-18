import React from "react";
import { WithStyles, Typography } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import CustomTreeItem from "shared-components/tree/customtreeitem/CustomTreeItem";

type LHLabelTreeProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHLabelTree: React.FunctionComponent<LHLabelTreeProps> = ({
  classes
}) => {
  return (
    <TreeView classes={{ root: classes.treeRoot }}>
      <CustomTreeItem
        nodeId="1"
        label="Label 1"
        labelCount="90"
        colour="#1a73e8"
        backgroundcolour="#e8f0fe"
      >
        <TreeItem
          nodeId="2"
          label={
            <Typography color="textSecondary" className={classes.seedText}>
              Seed1
            </Typography>
          }
        />
      </CustomTreeItem>
      <CustomTreeItem
        nodeId="3"
        label="Label 2"
        labelCount="90"
        colour="#1a73e8"
        backgroundcolour="#e8f0fe"
      >
        <TreeItem
          nodeId="4"
          label={
            <Typography color="textSecondary" className={classes.seedText}>
              Seed1
            </Typography>
          }
        />
      </CustomTreeItem>
      <CustomTreeItem
        nodeId="5"
        label="Label 3"
        labelCount="90"
        colour="#1a73e8"
        backgroundcolour="#e8f0fe"
      >
        <TreeItem
          nodeId="6"
          label={
            <Typography color="textSecondary" className={classes.seedText}>
              Seed1
            </Typography>
          }
        />
      </CustomTreeItem>
    </TreeView>
  );
};

export default connector(wrapStyles(LHLabelTree));
