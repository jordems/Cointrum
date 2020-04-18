import React from "react";

import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";
import { uuid } from "uuidv4";
import {
  createChart,
  IChartApi,
  MouseEventParams,
  ISeriesApi,
  Nominal,
} from "lightweight-charts";

import { styles, wrapStyles } from "./styles";

import { testCandles } from "./TESTDATA";
import { connector } from "./redux";
import { ICreateSeed } from "models";

type ChartProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles> & {
    chartID: string;
    minWidth: number;
  };

interface State {
  chartState?: IChartApi;
  candleSeries?: ISeriesApi<"Candlestick">;
  currentStart?: {
    timestamp: Date;
    price: {
      high: number;
      low: number;
    };
  };
  currentEnd?: {
    timestamp: Date;
    price: {
      high: number;
      low: number;
    };
  };
}

let startSeries: ISeriesApi<"Histogram"> | undefined;
let endSeries: ISeriesApi<"Histogram"> | undefined;

class Chart extends React.Component<ChartProps> {
  readonly state: State = {
    chartState: undefined,
    candleSeries: undefined,
    currentStart: undefined,
    currentEnd: undefined,
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.buildChart();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidUpdate(prevProps: ChartProps) {
    if (prevProps.mode !== this.props.mode) {
      this.applyMode();
    }
  }

  buildChart = () => {
    const { chartID, minWidth, phds } = this.props;

    const chartElement = document.getElementById(`Chart-${chartID}`);
    if (chartElement) {
      chartElement.innerHTML = "";
      const width =
        chartElement.clientWidth < minWidth
          ? minWidth
          : chartElement.clientWidth;

      const chart = createChart(chartElement, {
        width: width,
        height: width / 2,
        layout: {
          backgroundColor: "#303030",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.3)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.3)",
          },
        },
        priceScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
      });

      chart.subscribeClick(this.onMouseClick); //For Testing Tool

      var candleSeries = chart.addCandlestickSeries({
        upColor: "#81c784",
        downColor: "#303030",
        borderDownColor: "#d32f2f",
        borderUpColor: "#81c784",
        wickDownColor: "#d32f2f",
        wickUpColor: "#81c784",
      });

      this.applyMode(chart);

      candleSeries.setData(phds);

      this.applyULSeeds(chart);

      this.setState({ chartState: chart, candleSeries: candleSeries });
    }
  };

  applyMode = (chart?: IChartApi) => {
    let chartState = chart;

    if (!chart) {
      chartState = this.state.chartState;
    }
    if (this.props.mode === "SEEDSELECT") {
      chartState?.applyOptions({
        handleScroll: false,
        handleScale: false,
      });
    } else {
      chartState?.applyOptions({
        handleScroll: true,
        handleScale: true,
      });
    }

    if (!chart) {
      this.setState({ chartState: chartState });
    }
  };

  applyULSeeds = (chart?: IChartApi) => {
    let chartState = chart;

    if (!chart) {
      chartState = this.state.chartState;
    }

    if (chartState) {
      const { currentLabel } = this.props;
      const { currentStart, currentEnd } = this.state;

      if (currentEnd && currentLabel) {
        endSeries = chartState.addHistogramSeries({
          title: "End Point",
          base: currentEnd.price.low,
        });

        let data: any[] = [];

        endSeries.applyOptions({
          base: currentEnd.price.low - 0.02 * currentEnd.price.low,
        });
        data.push({
          time: currentEnd.timestamp,
          value: currentEnd.price.high + 0.02 * currentEnd.price.low,
          color: currentLabel.colour,
        });

        endSeries.setData(data);
      } else if (currentStart && currentLabel) {
        startSeries = chartState.addHistogramSeries({
          title: "Start Point",
          base: currentStart.price.low,
        });

        let data: any[] = [];

        startSeries.applyOptions({
          base: currentStart.price.low - 0.02 * currentStart.price.low,
        });
        data.push({
          time: currentStart.timestamp,
          value: currentStart.price.high + 0.02 * currentStart.price.low,
          color: currentLabel.colour,
        });

        startSeries.setData(data);
      }

      if (!chart) {
        this.setState({ chartState: chartState });
      }
    }
  };

  resetChartExtras = (chart?: IChartApi) => {
    let chartState = chart;

    if (!chart) {
      chartState = this.state.chartState;
    }

    if (chartState) {
      if (startSeries) chartState.removeSeries(startSeries);

      if (endSeries) chartState.removeSeries(endSeries);
    }
    this.setState({ chartState: chartState });
  };

  onResize = () => {
    this.buildChart();
  };

  onMouseClick = (e: MouseEventParams) => {
    if (this.props.mode === "SEEDSELECT") {
      const time = e.time;
      const price = e.seriesPrices.entries().next();

      const { currentStart, currentEnd } = this.state;
      if (!currentStart && price && price.value) {
        this.setState({
          currentStart: {
            timestamp: time,
            price: price.value[1],
          },
        });
        console.log("Set Start Point", time, price.value[1]);
        this.applyULSeeds();
      } else if (!currentEnd && currentStart && price && price.value) {
        this.setState({
          currentEnd: {
            timestamp: time,
            price: price.value[1],
          },
        });
        console.log("Set End Point", time, price.value[1]);
        this.applyULSeeds();

        const newSeed: ICreateSeed = {
          tempid: uuid(),
          data: {
            start: {
              timestamp: currentStart.timestamp,
            },
            end: {
              timestamp: time,
            },
            max: 120,
          },
        };
        this.props.addSeedtoLabelUL(newSeed);

        setTimeout(() => {
          this.resetChartExtras();
        }, 50);

        this.setState({ currentStart: undefined, currentEnd: undefined });
      }

      console.log(e);
      //window.addEventListener("mouseup", )
    }
  };

  render() {
    const { classes, chartID } = this.props;

    return <div id={`Chart-${chartID}`} className={classes.root}></div>;
  }
}

export default connector(wrapStyles(Chart));
