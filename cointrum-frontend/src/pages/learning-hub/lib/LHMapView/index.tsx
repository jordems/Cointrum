import React from "react";
import { WithStyles, Button } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import Chart from "shared-components/charts/CandleChart";

import LHSeedSelectedCard from "./LHSeedsSelectedCard";
import { candleConversion } from "shared-components/charts/lib/DataTypeConversion";

type LHMapViewProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHMapView extends React.Component<LHMapViewProps> {
  componentDidMount() {
    this.props.fetchInitialPHDS();
  }

  render() {
    const { classes, loading, phds } = this.props;

    const displayChart = !loading && Object.keys(phds).length !== 0;

    return (
      <div className={classes.root}>
        <LHSeedSelectedCard />

        {displayChart && (
          <Chart data={candleConversion(phds)} width={1100} height={700} />
        )}
      </div>
    );
  }
}

export default connector(wrapStyles(LHMapView));
