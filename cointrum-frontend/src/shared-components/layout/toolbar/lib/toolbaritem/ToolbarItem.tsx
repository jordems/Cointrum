import React from "react";
import { Link } from "react-router-dom";
import {
  WithStyles,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import MapIcon from "@material-ui/icons/Map";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import { styles, wrapStyles } from "./styles";

type ToolbarItemProps = WithStyles<typeof styles> & {
  item: {
    id: string;
    type: "item" | "divider";
    name: string;
    link: string;
    icon: string;
  };
  currentPath: string;
};

const ToolbarItem: React.FunctionComponent<ToolbarItemProps> = ({
  classes,
  item,
  currentPath
}) => {
  const itemSelected = item.link === currentPath;
  switch (item.type) {
    case "item":
      return (
        <Link to={item.link} className={classes.link}>
          <ListItem button selected={itemSelected}>
            <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </Link>
      );
    case "divider":
      return <Divider />;
    default:
      return null;
  }
};

function getIcon(name: string) {
  switch (name) {
    case "Map":
      return <MapIcon />;
    case "CastForEducation":
      return <CastForEducationIcon />;
    case "ImportExport":
      return <ImportExportIcon />;
    default:
      return <MapIcon />;
  }
}

export default wrapStyles(ToolbarItem);
