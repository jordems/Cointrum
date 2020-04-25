interface ChartTuple {
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

export interface ChartClickEvent {
  chartConfig: any;
  chartId: string | number;
  currentCharts: Array<string | number>;
  currentItem: ChartTuple;
  displayXAccessor: any;
  fullData: Array<ChartTuple>;
  hovering: boolean;
  mouseXY: [number, number];
  plotData: Array<ChartTuple>;
  prevMouseXY: [number, number];
  show: boolean;
  height: number;
  width: number;
}
