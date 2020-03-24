import React from "react";

import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import LHToolbar from "./lib/LHToolbar";
import TEMPSeedGenerator from "./lib/LHMapView/TEMPSeedGenerator";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type LearningHubPageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class LearningHubPage extends React.Component<LearningHubPageProps> {
  render() {
    return (
      <div>
        <LHToolbar />
        <h1>Learning Hub</h1>
        <TEMPSeedGenerator />
      </div>
    );
  }
}

export default connector(wrapStyles(LearningHubPage));
