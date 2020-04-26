import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import * as React from "react";
import { Chart, ChartCanvas } from "react-financial-charts";
import { XAxis, YAxis } from "react-financial-charts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-financial-charts/lib/coordinates";
import { elderRay, ema } from "react-financial-charts/lib/indicator";
import { ClickCallback } from "react-financial-charts/lib/interactive";
import { discontinuousTimeScaleProviderBuilder } from "react-financial-charts/lib/scale";
import {
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
} from "react-financial-charts/lib/series";
import {
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
} from "react-financial-charts/lib/tooltip";
import { withDeviceRatio } from "react-financial-charts/lib/utils";
import { lastVisibleItemBasedZoomAnchor } from "react-financial-charts/lib/utils/zoomBehavior";
import { Label } from "react-financial-charts/lib/annotation";
import { IOHLCData } from "./lib/IOHLCData";
import { ChartClickEvent } from "./lib/ChartClickEvent";

interface StockChartProps {
  readonly data: IOHLCData[];
  readonly height: number;
  readonly dateTimeFormat?: string;
  readonly pricesDisplayFormat?: string;
  readonly width: number;
  readonly ratio: number;
  readonly onClick?: (event: ChartClickEvent) => void;
}

const ChartStyles = {
  showGridLines: true,
  gridLinesStroke: "rgba(197, 203, 206, 0.3)",
  fontColour: "white",
};

class StockChart extends React.Component<StockChartProps> {
  private readonly margin = { left: 0, right: 48, top: 0, bottom: 24 };
  private readonly pricesDisplayFormat = format(
    this.props.pricesDisplayFormat ? this.props.pricesDisplayFormat : ".4f"
  );
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date
  );

  public render() {
    const {
      data: initialData,
      dateTimeFormat = "%d %b, %Y",
      height,
      ratio,
      width,
    } = this.props;

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d: any, c: any) => {
        d.ema12 = c;
      })
      .accessor((d: any) => d.ema12);

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: any, c: any) => {
        d.ema26 = c;
      })
      .accessor((d: any) => d.ema26);

    const elder = elderRay();

    const calculatedData = elder(ema26(ema12(initialData)));

    const { margin, xScaleProvider } = this;

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(data[data.length - 1]);
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];

    const gridHeight = height - margin.top - margin.bottom;

    const elderRayHeight = 100;
    const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_: number, h: number) => [
      0,
      h - barChartHeight - elderRayHeight,
    ];
    const chartHeight = gridHeight - elderRayHeight;

    const timeDisplayFormat = timeFormat(dateTimeFormat);

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart
          id={"VolumeChart"}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={this.barChartExtents}
        >
          <BarSeries fill={this.openCloseColor} yAccessor={this.yBarSeries} />
        </Chart>
        <Chart
          id={"CandleChart"}
          height={chartHeight}
          yExtents={this.candleChartExtents}
        >
          <XAxis
            tickLabelFill={ChartStyles.fontColour}
            showGridLines={ChartStyles.showGridLines}
            showTickLabel={false}
            gridLinesStroke={ChartStyles.gridLinesStroke}
          />
          <YAxis
            tickLabelFill={ChartStyles.fontColour}
            fill={ChartStyles.fontColour}
            showGridLines={ChartStyles.showGridLines}
            tickFormat={this.pricesDisplayFormat}
            gridLinesStroke={ChartStyles.gridLinesStroke}
          />
          <CandlestickSeries />
          <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={this.pricesDisplayFormat}
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator}
          />
          <MovingAverageTooltip
            textFill={ChartStyles.fontColour}
            displayFormat={this.pricesDisplayFormat}
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: "EMA",
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: "EMA",
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />

          {/* <ZoomButtons /> */}
          <OHLCTooltip
            origin={[8, 16]}
            textFill={ChartStyles.fontColour}
            ohlcFormat={this.pricesDisplayFormat}
          />
          <ClickCallback onClick={this.props.onClick} />
        </Chart>
        <Chart
          id={"ElderRayChart"}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis
            tickLabelFill={ChartStyles.fontColour}
            showGridLines={ChartStyles.showGridLines}
            gridLinesStroke={ChartStyles.gridLinesStroke}
          />
          <YAxis
            tickLabelFill={ChartStyles.fontColour}
            ticks={4}
            tickFormat={this.pricesDisplayFormat}
          />

          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={this.pricesDisplayFormat}
          />

          <ElderRaySeries yAccessor={elder.accessor()} />

          <SingleValueTooltip
            valueFill={ChartStyles.fontColour}
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d: any) =>
              `${this.pricesDisplayFormat(
                d.bullPower
              )}, ${this.pricesDisplayFormat(d.bearPower)}`
            }
            origin={[8, 16]}
          />
          <ClickCallback onClick={this.props.onClick} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }

  private readonly barChartExtents = (data: IOHLCData) => {
    return data.volume;
  };

  private readonly candleChartExtents = (data: IOHLCData) => {
    return [data.high, data.low];
  };

  private readonly yBarSeries = (data: IOHLCData) => {
    return data.volume;
  };

  private readonly yEdgeIndicator = (data: IOHLCData) => {
    return data.close;
  };

  private readonly openCloseColor = (data: IOHLCData) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };
}

export default withDeviceRatio()(StockChart);
