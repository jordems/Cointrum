import React from "react";
import { Link } from "react-router-dom";

import {
  WithStyles,
  Drawer,
  Divider,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { styles, wrapStyles } from "./styles";

import CreationHubIcon from "@material-ui/icons/Map";
import LearningHubIcon from "@material-ui/icons/CastForEducation";
import TradingHubIcon from "@material-ui/icons/ImportExport";

type ToolbarProps = WithStyles<typeof styles>;

const Toolbar: React.FunctionComponent<ToolbarProps> = ({ classes }) => {
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to={"/creation-hub"}>
          <ListItem button>
            <ListItemIcon>
              <CreationHubIcon />
            </ListItemIcon>
            <ListItemText primary={"Creation Hub"} />
          </ListItem>
        </Link>
        <Link to={"/learning-hub"}>
          <ListItem button>
            <ListItemIcon>
              <LearningHubIcon />
            </ListItemIcon>
            <ListItemText primary={"Learning Hub"} />
          </ListItem>
        </Link>
        <Link to={"/learning-hub"}>
          <ListItem button>
            <ListItemIcon>
              <TradingHubIcon />
            </ListItemIcon>
            <ListItemText primary={"Trading Hub"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {/*<List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
};

export default wrapStyles(Toolbar);
