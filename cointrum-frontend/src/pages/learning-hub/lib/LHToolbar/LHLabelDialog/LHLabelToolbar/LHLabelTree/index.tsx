import React from "react";
import { WithStyles, Typography } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import CustomTreeItem from "shared-components/tree/customtreeitem/CustomTreeItem";
import { ILabel } from "models";

type LHLabelTreeProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHLabelTree: React.FunctionComponent<LHLabelTreeProps> = ({
  classes,
  labels,
  seedsbyLabel,
  openEditLabelDialog
}) => {
  const onEditClick = (label: ILabel) => {
    openEditLabelDialog(label);
  };

  return (
    <TreeView classes={{ root: classes.treeRoot }}>
      {Object.keys(labels).map(labelID => {
        const label = labels[labelID];

        const seedIDs =
          seedsbyLabel[labelID] && Object.keys(seedsbyLabel[labelID]);

        return (
          <CustomTreeItem
            key={labelID}
            nodeId={labelID}
            label={label.name}
            labelCount={seedIDs ? seedIDs.length : 0}
            labelData={label}
            colour="#1a73e8"
            backgroundcolour="#e8f0fe"
            onEditClick={onEditClick}
          >
            {seedIDs &&
              seedIDs.map(seedID => {
                const seed =
                  seedsbyLabel[labelID] && seedsbyLabel[labelID][seedID];
                if (!seed) {
                  return null;
                }

                return (
                  <TreeItem
                    key={seedID}
                    nodeId={seedID}
                    label={
                      <Typography
                        color="textSecondary"
                        className={classes.seedText}
                      >
                        {seed.date_created.toDateString()}
                      </Typography>
                    }
                  />
                );
              })}
          </CustomTreeItem>
        );
      })}
    </TreeView>
  );
};

export default connector(wrapStyles(LHLabelTree));
