import React from "react";
import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import Chart from "shared-components/charts/CandleChart";

import { candleConversion } from "shared-components/charts/lib/DataTypeConversion";
import { getPriceDisplayFormat } from "shared-components/charts/lib/getPriceDisplayFormat";

type MHMapViewProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class MHMapView extends React.Component<MHMapViewProps> {
  componentDidMount() {
    this.props.fetchPHDSRange(1587657944046, 1587687944046);
  }

  render() {
    const { classes, loading, phds } = this.props;

    const phdsKeys = Object.keys(phds);
    const displayChart = !loading && phdsKeys.length !== 0;

    const priceDisplayFormat = !displayChart
      ? undefined
      : getPriceDisplayFormat(phds[phdsKeys.values().next().value]);

    const chartInput = candleConversion(phds);

    return (
      <div className={classes.root}>
        {displayChart && (
          <Chart
            data={chartInput}
            width={1150}
            height={700}
            pricesDisplayFormat={priceDisplayFormat}
          />
        )}
      </div>
    );
  }
}

export default connector(wrapStyles(MHMapView));
