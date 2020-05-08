import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";
import { emaAlgo } from "./ema";

export const elderray: IBaseIndicator = (candles, prevCandles) => {
  let tcandles = [...candles];

  tcandles = elderrayAlgo(candles, prevCandles);

  return tcandles;
};

function elderrayAlgo(candles: ICandle[], prevCandles: ICandle[]): ICandle[] {
  let ema13elements = emaAlgo(13, [...candles], prevCandles);

  let results = [...candles];
  for (let x = 0; x < candles.length; x++) {
    if (ema13elements[x] === -1) {
      results[x].ElderRay = [-1, -1];
    } else {
      results[x].ElderRay = [
        parseFloat(results[x].high) - ema13elements[x],
        parseFloat(results[x].low) - ema13elements[x],
      ];
    }
    results[x].ema13 = ema13elements[x];
  }

  return results;
}
