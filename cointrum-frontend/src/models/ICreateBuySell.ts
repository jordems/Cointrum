import { BuySellButtonStates } from "store/learninghub/_buysell/types/current.types";

export interface ICreateBuySell {
  tempid: string;
  type: BuySellButtonStates;
  openTime: number;
}
