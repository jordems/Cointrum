import React from "react";

import { WithStyles } from "@material-ui/core";

import { createChart, IChartApi } from "lightweight-charts";

import { styles, wrapStyles } from "./styles";

import { testCandles } from "./TESTDATA";

type ChartProps = WithStyles<typeof styles> & {
  chartID: string;
  minWidth: number;
};

interface State {
  chartState?: IChartApi;
}

class Chart extends React.Component<ChartProps> {
  readonly state: State = {
    chartState: undefined
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.buildChart();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  buildChart = () => {
    const { chartID, minWidth } = this.props;
    const chartElement = document.getElementById(`Chart-${chartID}`);
    if (chartElement) {
      const width =
        chartElement.clientWidth < minWidth
          ? minWidth
          : chartElement.clientWidth;

      const chart = createChart(chartElement, {
        width: width,
        height: width / 2,
        layout: {
          backgroundColor: "#000000",
          textColor: "rgba(255, 255, 255, 0.9)"
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.5)"
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.5)"
          }
        },
        priceScale: {
          borderColor: "rgba(197, 203, 206, 0.8)"
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)"
        }
      });

      var candleSeries = chart.addCandlestickSeries({
        upColor: "rgba(255, 144, 0, 1)",
        downColor: "#000",
        borderDownColor: "rgba(255, 144, 0, 1)",
        borderUpColor: "rgba(255, 144, 0, 1)",
        wickDownColor: "rgba(255, 144, 0, 1)",
        wickUpColor: "rgba(255, 144, 0, 1)"
      });

      candleSeries.setData(testCandles);
      this.setState({ chartState: chart });
    }
  };

  onResize = () => {
    const { chartID } = this.props;

    const chartElement = document.getElementById(`Chart-${chartID}`);
    if (chartElement) {
      chartElement.innerHTML = "";
      this.buildChart();
    }
  };

  render() {
    const { classes, chartID } = this.props;

    return <div id={`Chart-${chartID}`} className={classes.root}></div>;
  }
}

export default wrapStyles(Chart);
