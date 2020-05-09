import React from "react";
import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import Chart from "shared-components/charts/CandleChart";

import { candleConversion } from "shared-components/charts/lib/DataTypeConversion";
import { getPriceDisplayFormat } from "shared-components/charts/lib/getPriceDisplayFormat";
import { IChartClickEvent } from "shared-components/charts/lib/ChartClickEvent";
import subtractTime from "services/tools/subtractTime";

type LHChartProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHChart extends React.Component<LHChartProps> {
  handleChartClick = (event: IChartClickEvent) => {
    const { seedtool } = this.props;

    switch (seedtool) {
      case "BUYSELL":
        console.log("Selected BuySell Area", event.currentItem.openTime);
        break;
      case "SEEDSELECT":
        this.props.handleSelection(event.currentItem);
        break;
      case "TEST":
        break;
    }
  };

  handleLoadMore = (start: number, _end: number): Promise<boolean> => {
    const { loading } = this.props;

    if (start < 0 && !loading) {
      const { phds, cycleduration } = this.props;
      const earliestTimeLoaded: number = Object.keys(phds)
        .sort()
        .values()
        .next().value;

      if (!cycleduration) {
        throw new Error("Map Not selected");
      }

      const startTime = subtractTime(earliestTimeLoaded, cycleduration, 1000);

      return this.props.fetchPHDSRange(startTime, earliestTimeLoaded);
    }

    return Promise.resolve(true);
  };

  render() {
    const { loading, phds } = this.props;

    const phdsKeys = Object.keys(phds);
    const displayChart = phdsKeys.length !== 0;

    const priceDisplayFormat = !displayChart
      ? undefined
      : getPriceDisplayFormat(phds[phdsKeys.values().next().value]);

    if (!displayChart) {
      return null;
    }
    return (
      <Chart
        data={candleConversion(phds)}
        width={1150}
        height={700}
        pricesDisplayFormat={priceDisplayFormat}
        onClick={this.handleChartClick}
        onLoadMore={this.handleLoadMore}
      />
    );
  }
}

export default connector(wrapStyles(LHChart));
