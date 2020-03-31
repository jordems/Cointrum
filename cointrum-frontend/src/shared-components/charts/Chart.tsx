import React from "react";

import { WithStyles } from "@material-ui/core";

import {
  createChart,
  IChartApi,
  MouseEventParams,
  BarPrices,
  ISeriesApi,
  Nominal
} from "lightweight-charts";

import { styles, wrapStyles } from "./styles";

import { testCandles } from "./TESTDATA";
import { ICreateSeed } from "models";
import { uuid } from "uuidv4";

type ChartProps = WithStyles<typeof styles> & {
  chartID: string;
  minWidth: number;
  mode: "SEEDSELECT" | "VIEW" | "TEST";
  ulseedsbyLabel: {
    [labelid: string]: { [tempseedid: string]: ICreateSeed };
  };
  onSeedSelection: (seed: ICreateSeed) => void;
};

interface State {
  chartState?: IChartApi;
  currentHover: MouseEventParams;
  currentSeedSelection: {
    start: {
      timestamp: Date;
      point: { x: number; y: number };
    };
    end: {
      timestamp: Date;
      point: { x: number; y: number };
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
      >()
    },
    currentSeedSelection: {
      start: {
        timestamp: new Date(),
        point: { x: 0, y: 0 }
      },
      end: {
        timestamp: new Date(),
        point: { x: 0, y: 0 }
      }
    }
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
      this.buildChart();
    }
  }

  buildChart = () => {
    const { chartID, minWidth, mode } = this.props;
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
          textColor: "rgba(255, 255, 255, 0.9)"
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.3)"
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.3)"
          }
        },
        priceScale: {
          borderColor: "rgba(197, 203, 206, 0.8)"
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)"
        }
      });

      if (mode === "SEEDSELECT") {
        chart.applyOptions({
          handleScroll: {
            mouseWheel: false,
            pressedMouseMove: false,
            horzTouchDrag: false,
            vertTouchDrag: false
          },
          handleScale: {
            axisPressedMouseMove: false,
            mouseWheel: false,
            pinch: false
          }
        });
      }

      chart.subscribeCrosshairMove(this.handleUpdateCurrentHover);

      var candleSeries = chart.addCandlestickSeries({
        upColor: "#81c784",
        downColor: "#303030",
        borderDownColor: "#d32f2f",
        borderUpColor: "#81c784",
        wickDownColor: "#d32f2f",
        wickUpColor: "#81c784"
      });

      candleSeries.setData(testCandles);

      this.setState({ chartState: chart });
    }
  };

  handleUpdateCurrentHover = (e: MouseEventParams) => {
    this.setState({ currentHover: e });
  };

  onResize = () => {
    this.buildChart();
  };

  onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { currentHover, currentSeedSelection } = this.state;
    console.log({
      start: {
        timestamp: currentHover.time,
        point: currentHover.point
      }
    });
    this.setState({
      currentSeedSelection: {
        ...currentSeedSelection,
        start: {
          timestamp: currentHover.time,
          point: currentHover.point
        }
      }
    });
  };

  onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { currentHover, currentSeedSelection } = this.state;
    this.setState({
      currentSeedSelection: {
        ...currentSeedSelection,
        end: {
          timestamp: currentHover.time,
          point: currentHover.point
        }
      }
    });

    const newSeed: ICreateSeed = {
      tempid: uuid(),
      data: {
        ...currentSeedSelection,
        end: {
          timestamp: currentHover.time,
          point: currentHover.point
        }
      }
    };

    this.props.onSeedSelection(newSeed);
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

export default wrapStyles(Chart);
