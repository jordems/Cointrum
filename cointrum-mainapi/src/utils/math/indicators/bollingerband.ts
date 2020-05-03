import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ICandleAdapter } from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";
import { std } from "../std";
import { IPHDSElement } from "../../../models/PHDSElement";

export const bollingerband: IBaseIndicator = (candles, lastknownDocuments) => {
  let tcandles = [...candles];

  tcandles = bollingerbandAlgo(tcandles, lastknownDocuments);

  return tcandles;
};

export function bollingerbandAlgo(
  candles: ICandle[],
  lastknownDocuments?: IPHDSElement[]
): ICandle[] {
  // Convert lastknownDocuments to type ICandle
  let lastknownCandles: ICandle[] = [];
  if (lastknownDocuments) {
    for (const phdselement of lastknownDocuments) {
      lastknownCandles.push(ICandleAdapter(phdselement));
    }
  }
  let fullist = [...lastknownCandles, ...candles];

  let startingidx =
    lastknownCandles.length === 0 ? 20 : lastknownCandles.length;

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

  return fullist.slice(lastknownCandles.length);
}
