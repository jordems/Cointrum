import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";
import { std } from "../std";

export const bollingerband: IBaseIndicator = (candles, lastknownDocuments) => {
  let tcandles = [...candles];

  const prevCandles = ArrayICandleAdapter(lastknownDocuments);

  tcandles = bollingerbandAlgo(tcandles, prevCandles);

  return tcandles;
};

export function bollingerbandAlgo(
  candles: ICandle[],
  prevCandles?: ICandle[]
): ICandle[] {
  // Reverse Candles as it's backwards to start
  let fullist = [...candles];

  if (prevCandles) {
    fullist = [...prevCandles, ...candles];
  }

  let startingidx =
    prevCandles && prevCandles.length > 0 ? prevCandles.length : 20;

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
