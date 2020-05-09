import { IOHLCData } from "./IOHLCData";

export interface IChartClickEvent {
  chartConfig: any;
  chartId: string | number;
  currentCharts: Array<string | number>;
  currentItem: IOHLCData;
  displayXAccessor: any;
  fullData: Array<IOHLCData>;
  hovering: boolean;
  mouseXY: [number, number];
  plotData: Array<IOHLCData>;
  prevMouseXY: [number, number];
  show: boolean;
  height: number;
  width: number;
}
