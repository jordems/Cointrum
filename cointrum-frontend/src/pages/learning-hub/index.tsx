import React from "react";

import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import LHToolbar from "./lib/LHToolbar";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type LearningHubPageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class LearningHubPage extends React.Component<LearningHubPageProps> {
  render() {
    return (
      <div>
        <h1>Learning Hub</h1>
        <LHToolbar />
      </div>
    );
  }
}

export default connector(wrapStyles(LearningHubPage));
