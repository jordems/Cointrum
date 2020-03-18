import React from "react";

import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type HomePageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class HomePage extends React.Component<HomePageProps> {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default connector(wrapStyles(HomePage));
