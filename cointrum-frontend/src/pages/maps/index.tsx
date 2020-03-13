import React from "react";

import { Button, TextField, WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type MapsPageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class MapsPage extends React.Component<MapsPageProps> {
  readonly state: any = {
    message: ""
  };

  render() {
    return (
      <div>
        <h1>Maps</h1>
      </div>
    );
  }
}

export default connector(wrapStyles(MapsPage));
