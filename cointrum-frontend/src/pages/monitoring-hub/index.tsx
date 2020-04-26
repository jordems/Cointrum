import React from "react";

import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import MHMapView from "./lib/MHMapView";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type MonitoringHubPageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class MonitoringHubPage extends React.Component<MonitoringHubPageProps> {
  render() {
    return (
      <div>
        <h1>Monitoring Hub</h1>
        <MHMapView />
      </div>
    );
  }
}

export default connector(wrapStyles(MonitoringHubPage));
