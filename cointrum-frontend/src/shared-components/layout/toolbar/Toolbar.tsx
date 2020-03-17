import React from "react";
import { WithStyles, Drawer, Divider, List } from "@material-ui/core";
import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import ToolbarItem from "shared-components/layout/toolbar/lib/toolbaritem/ToolbarItem";
import TradingMapCard from "shared-components/layout/toolbar/lib/tradingmapcard/TradingMapCard";
import LayoutConfig from "shared-components/layout/LayoutConfig";
import history from "services/history";

import { connector } from "./redux";

type ToolbarProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  classes,
  current
}) => {
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
        <TradingMapCard currentTradingMap={current.map} />
      </div>
      <Divider />
      <List>
        {LayoutConfig.toolbar.items.map((item, idx) => (
          <ToolbarItem
            disabled={current.map === null}
            key={item.id}
            item={item}
            currentPath={currentPath}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default connector(wrapStyles(Toolbar));
