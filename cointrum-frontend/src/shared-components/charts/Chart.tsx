import React from "react";

import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";
import { uuid } from "uuidv4";
import {
  createChart,
  IChartApi,
  MouseEventParams,
  BarPrices,
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
  currentHover: MouseEventParams;
  currentSeedSelection: {
    start: {
      timestamp: Date;
    };
    end: {
      timestamp: Date;
    };
  };
}

class Chart extends React.Component<ChartProps> {
  readonly state: State = {
    chartState: undefined,
    currentHover: {
      time: undefined,
      point: undefined,
      hoveredSeries: undefined,
      hoveredMarkerId: undefined,
      seriesPrices: new Map<
        ISeriesApi<"Bar" | "Candlestick" | "Area" | "Line" | "Histogram">,
        Nominal<number, "BarPrice"> | BarPrices
      >(),
    },
    currentSeedSelection: {
      start: {
        timestamp: new Date(),
      },
      end: {
        timestamp: new Date(),
      },
    },
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

    if (
      Object.keys(prevProps.ulseedsbyLabel).length !==
      Object.keys(this.props.ulseedsbyLabel).length
    ) {
      this.applyULSeeds();
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

      chart.subscribeCrosshairMove(this.handleUpdateCurrentHover);

      var candleSeries = chart.addCandlestickSeries({
        upColor: "#81c784",
        downColor: "#303030",
        borderDownColor: "#d32f2f",
        borderUpColor: "#81c784",
        wickDownColor: "#d32f2f",
        wickUpColor: "#81c784",
      });
      this.applyMode(chart);
      this.applyULSeeds(chart);

      candleSeries.setData(phds);

      this.setState({ chartState: chart });
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
      const { ulseedsbyLabel, labels } = this.props;

      for (const labelid of Object.keys(ulseedsbyLabel)) {
        for (const tseedid of Object.keys(ulseedsbyLabel[labelid])) {
          const ulseed = ulseedsbyLabel[labelid][tseedid];
          const label = labels[labelid];
          console.log(label.colour.substr(1));
          const seed = chartState.addAreaSeries({
            title: label.name,
            bottomColor: "#00" + label.colour.substr(1),
            lineColor: label.colour,
            topColor: label.colour,
          });
          seed.setData([
            { time: ulseed.data.start.timestamp, value: 220 },
            { time: ulseed.data.end.timestamp, value: 220 },
          ]);
        }
      }
      if (!chart) {
        this.setState({ chartState: chartState });
      }
    }
  };

  handleUpdateCurrentHover = (e: MouseEventParams) => {
    this.setState({ currentHover: e });
  };

  onResize = () => {
    this.buildChart();
  };

  onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.props.mode === "SEEDSELECT") {
      const { currentHover, currentSeedSelection } = this.state;
      console.log({
        start: {
          timestamp: currentHover.time,
        },
      });
      this.setState({
        currentSeedSelection: {
          ...currentSeedSelection,
          start: {
            timestamp: currentHover.time,
          },
        },
      });
    }
  };

  onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.props.mode === "SEEDSELECT") {
      const { currentHover, currentSeedSelection } = this.state;
      this.setState({
        currentSeedSelection: {
          ...currentSeedSelection,
          end: {
            timestamp: currentHover.time,
            point: currentHover.point,
          },
        },
      });

      // TODO Get max value within seed bounds and set to `max`

      const newSeed: ICreateSeed = {
        tempid: uuid(),
        data: {
          ...currentSeedSelection,
          end: {
            timestamp: currentHover.time,
          },
          max: 120,
        },
      };

      this.props.addSeedtoLabelUL(newSeed);
    }
  };

  render() {
    const { classes, chartID } = this.props;

    return (
      <div
        id={`Chart-${chartID}`}
        className={classes.root}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      ></div>
    );
  }
}

export default connector(wrapStyles(Chart));
