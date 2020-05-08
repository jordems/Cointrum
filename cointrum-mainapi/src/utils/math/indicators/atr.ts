import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";

export const atr: IBaseIndicator = (candles, prevCandles) => {
  let tcandles = [...candles];

  let prevCandle =
    prevCandles.length > 0 ? prevCandles[prevCandles.length - 1] : undefined;

  tcandles = atrAlgo(14, tcandles, prevCandle);

  return tcandles;
};

export function atrAlgo(
  period: number,
  candles: ICandle[],
  prevCandle?: ICandle
): ICandle[] {
  let result = [...candles];
  let prevATR;
  let idx = 0;

  if (!prevCandle) {
    if (candles.length < period + 1) {
      for (idx = 0; idx < candles.length; idx++) {
        result[idx].atr14 = -1;
      }
      return result;
    }

    let Isum = 0;
    for (idx = 1; idx < period + 1; idx++) {
      Isum += Math.max(
        parseFloat(candles[idx].high) - parseFloat(candles[idx].low),
        parseFloat(candles[idx].high) - parseFloat(candles[idx - 1].close),
        parseFloat(candles[idx - 1].close) - parseFloat(candles[idx].low)
      );
      result[idx - 1].atr14 = -1;
    }

    // Set inital ATR if it doesn't exist
    prevATR = Isum / period;
    result[period].atr14 = prevATR;

    const a = 2 / (period + 1);

    let ptr = Math.max(
      parseFloat(candles[idx].high) - parseFloat(candles[idx].low),
      parseFloat(candles[idx].high) - parseFloat(candles[idx - 1].close),
      parseFloat(candles[idx - 1].close) - parseFloat(candles[idx].low)
    );

    let patr = a * ptr + (1 - a) * prevATR;
    result[idx].atr14 = patr;

    let tr = 0;
    let atr = 0;

    for (let x = idx + 1; x < candles.length; x++) {
      tr = Math.max(
        parseFloat(candles[x].high) - parseFloat(candles[x].low),
        parseFloat(candles[x].high) - parseFloat(candles[x - 1].close),
        parseFloat(candles[x - 1].close) - parseFloat(candles[x].low)
      );

      atr = a * tr + (1 - a) * patr;

      result[x].atr14 = atr;
      patr = atr;
      ptr = tr;
    }
  } else {
    prevATR = prevCandle.atr14;

    if (prevATR === -1 || prevATR === undefined) {
      return atrAlgo(period, candles);
    }

    const a = 2 / (period + 1);

    let ptr = Math.max(
      parseFloat(candles[idx].high) - parseFloat(candles[idx].low),
      parseFloat(candles[idx].high) - parseFloat(prevCandle.close),
      parseFloat(prevCandle.close) - parseFloat(candles[idx].low)
    );

    let patr = a * ptr + (1 - a) * prevATR;
    result[idx].atr14 = patr;

    let tr = 0;
    let atr = 0;

    for (let x = idx + 1; x < candles.length; x++) {
      tr = Math.max(
        parseFloat(candles[x].high) - parseFloat(candles[x].low),
        parseFloat(candles[x].high) - parseFloat(candles[x - 1].close),
        parseFloat(candles[x - 1].close) - parseFloat(candles[x].low)
      );

      atr = a * tr + (1 - a) * patr;

      result[x].atr14 = atr;
      patr = atr;
      ptr = tr;
    }
  }
  return result;
}
