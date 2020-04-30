import React from "react";
import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import LHChart from "./LHChart";

import LHSeedSelectedCard from "./LHSeedsSelectedCard";

type LHMapViewProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHMapView extends React.Component<LHMapViewProps> {
  componentDidMount() {
    this.props.fetchInitialPHDS();
  }

  render() {
    const { classes, loading, error } = this.props;

    return (
      <div className={classes.root}>
        <LHSeedSelectedCard />

        <LHChart />
      </div>
    );
  }
}

export default connector(wrapStyles(LHMapView));
