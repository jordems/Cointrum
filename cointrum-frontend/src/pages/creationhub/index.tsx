import React from "react";

import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type CreationHubPageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class CreationHubPage extends React.Component<CreationHubPageProps> {
  render() {
    //const { classes } = this.props;
    return (
      <div>
        <h1>Creation Hub</h1>
      </div>
    );
  }
}

export default connector(wrapStyles(CreationHubPage));
