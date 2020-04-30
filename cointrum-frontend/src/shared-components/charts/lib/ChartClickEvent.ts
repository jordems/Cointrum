export interface IChartTuple {
  close: number;
  date: Date;
  elderRay: {
    bearPower: number;
    bullPower: number;
  };
  ema12: number;
  ema26: number;
  high: number;
  idx: { index: number; level: number; date: Date; format: any };
  low: number;
  open: number;
  volume: number;
}

export interface IChartClickEvent {
  chartConfig: any;
  chartId: string | number;
  currentCharts: Array<string | number>;
  currentItem: IChartTuple;
  displayXAccessor: any;
  fullData: Array<IChartTuple>;
  hovering: boolean;
  mouseXY: [number, number];
  plotData: Array<IChartTuple>;
  prevMouseXY: [number, number];
  show: boolean;
  height: number;
  width: number;
}
