import React from "react";
import { WithStyles, Drawer, Divider, List } from "@material-ui/core";
import { styles, wrapStyles } from "./styles";

import ToolbarItem from "shared-components/layout/toolbar/lib/toolbaritem/ToolbarItem";
import TradingMapCard from "shared-components/layout/toolbar/lib/tradingmapcard/TradingMapCard";
import LayoutConfig from "shared-components/layout/LayoutConfig";
import history from "services/history";

type ToolbarProps = WithStyles<typeof styles>;

const Toolbar: React.FunctionComponent<ToolbarProps> = ({ classes }) => {
  const currentPath = history.location.pathname;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <div className={classes.toolbar}>
        <TradingMapCard />
      </div>
      <Divider />
      <List>
        {LayoutConfig.toolbar.items.map((item, idx) => (
          <ToolbarItem key={item.id} item={item} currentPath={currentPath} />
        ))}
      </List>
    </Drawer>
  );
};

export default wrapStyles(Toolbar);
