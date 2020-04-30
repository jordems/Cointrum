import React from "react";
import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import Chart from "shared-components/charts/CandleChart";

import { candleConversion } from "shared-components/charts/lib/DataTypeConversion";
import { getPriceDisplayFormat } from "shared-components/charts/lib/getPriceDisplayFormat";
import { IChartClickEvent } from "shared-components/charts/lib/ChartClickEvent";
import { getDigestableSeeds } from "services/tools/DigestableSeeds";

type LHChartProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHChart extends React.Component<LHChartProps> {
  handleChartClick = (event: IChartClickEvent) => {
    this.props.handleSelection(event.currentItem);
  };

  render() {
    const { loading, phds, labels, ulseedsbyLabel } = this.props;

    const phdsKeys = Object.keys(phds);
    const displayChart = !loading && phdsKeys.length !== 0;

    const priceDisplayFormat = !displayChart
      ? undefined
      : getPriceDisplayFormat(phds[phdsKeys.values().next().value]);

    if (!displayChart) {
      return null;
    }

    // Get Labels Formatted into easily digestable structure for charts
    const seedsSelected = getDigestableSeeds(labels, ulseedsbyLabel);
    return (
      <Chart
        data={candleConversion(phds)}
        seedsSelected={seedsSelected}
        width={1150}
        height={700}
        pricesDisplayFormat={priceDisplayFormat}
        onClick={this.handleChartClick}
      />
    );
  }
}

export default connector(wrapStyles(LHChart));
