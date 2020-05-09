import { BuySellButtonStates } from "store/learninghub/_buysell/types/current.types";

export interface IBuySell {
  _id: string;
  tradingmapid: string;
  type: BuySellButtonStates;
  openTime: number;
  created_date: Date;
}
