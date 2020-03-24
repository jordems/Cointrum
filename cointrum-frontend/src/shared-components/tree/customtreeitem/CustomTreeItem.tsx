import React from "react";
import { WithStyles, Typography } from "@material-ui/core";
import { TreeItem, TreeItemProps } from "@material-ui/lab";

import EditIcon from "@material-ui/icons/Edit";

import { styles, wrapStyles } from "./styles";

declare module "csstype" {
  interface Properties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type CustomTreeItemProps = WithStyles<typeof styles> &
  TreeItemProps & {
    label: string;
    labelCount: number;
    colour: string;
    backgroundcolour: string;
  };

class CustomTreeItem extends React.Component<CustomTreeItemProps> {
  render() {
    const {
      classes,
      nodeId,
      label,
      labelCount,
      colour,
      backgroundcolour,
      ...other
    } = this.props;
    return (
      <TreeItem
        nodeId={nodeId}
        icon={
          <EditIcon
            style={{ marginLeft: 6 }}
            color="inherit"
            onClick={e => {
              e.preventDefault();
              console.log("Edit");
            }}
          />
        }
        label={
          <div className={classes.labelRoot}>
            <Typography variant="body2" className={classes.labelText}>
              {label}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelCount}
            </Typography>
          </div>
        }
        style={{
          "--tree-view-color": colour,
          "--tree-view-bg-color": backgroundcolour
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label
        }}
        {...other}
      />
    );
  }
}

export default wrapStyles(CustomTreeItem);
