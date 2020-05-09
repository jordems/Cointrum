import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";
import { std } from "../std";

export const bollingerband: IBaseIndicator = (candles, prevCandles) => {
  let tcandles = [...candles];

  tcandles = bollingerbandAlgo(tcandles, prevCandles);

  return tcandles;
};

export function bollingerbandAlgo(
  candles: ICandle[],
  prevCandles: ICandle[]
): ICandle[] {
  let fullist = [...prevCandles, ...candles];

  let startingidx = prevCandles.length !== 0 ? prevCandles.length : 20;

  if (prevCandles.length === 0) {
    if (candles.length < 20) {
      for (let x = 0; x < candles.length; x++) {
        fullist[x].BBlower = -1;
        fullist[x].BBmiddle = -1;
        fullist[x].BBupper = -1;
      }
    } else {
      for (let x = 0; x < 20; x++) {
        fullist[x].BBlower = -1;
        fullist[x].BBmiddle = -1;
        fullist[x].BBupper = -1;
      }
    }
  }

  for (let x = startingidx; x < fullist.length; x++) {
    const prev20 = fullist.slice(x - 20, x);
    const sma20 = smaAlgo(prev20);

    let closingPrices: number[] = [];

    for (const ele of prev20) {
      closingPrices.push(parseFloat(ele.close));
    }

    fullist[x].BBlower = sma20 - std(closingPrices) * 2;
    fullist[x].BBmiddle = sma20;
    fullist[x].BBupper = sma20 + std(closingPrices) * 2;
  }

  if (prevCandles) {
    return fullist.slice(prevCandles.length);
  } else {
    return fullist;
  }
}
