import React from "react";
import { WithStyles, Button } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import Chart from "shared-components/charts/CandleChart";

import LHSeedSelectedCard from "./LHSeedsSelectedCard";
import { candleConversion } from "shared-components/charts/lib/DataTypeConversion";
import { getPriceDisplayFormat } from "shared-components/charts/lib/getPriceDisplayFormat";
import { ChartClickEvent } from "shared-components/charts/lib/ChartClickEvent";

type LHMapViewProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHMapView extends React.Component<LHMapViewProps> {
  componentDidMount() {
    this.props.fetchInitialPHDS();
  }

  handleChartClick = (event: ChartClickEvent) => {
    // Add seed Selection Start and End Paramters into Redux
    console.log(event);
  };

  render() {
    const { classes, loading, phds } = this.props;

    const phdsKeys = Object.keys(phds);
    const displayChart = !loading && phdsKeys.length !== 0;

    const priceDisplayFormat = !displayChart
      ? undefined
      : getPriceDisplayFormat(phds[phdsKeys.values().next().value]);

    return (
      <div className={classes.root}>
        <LHSeedSelectedCard />

        {displayChart && (
          <Chart
            data={candleConversion(phds)}
            width={1150}
            height={700}
            pricesDisplayFormat={priceDisplayFormat}
            onClick={this.handleChartClick}
          />
        )}
      </div>
    );
  }
}

export default connector(wrapStyles(LHMapView));
