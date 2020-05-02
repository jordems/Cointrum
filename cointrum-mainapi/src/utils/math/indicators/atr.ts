import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const atr: IBaseIndicator = (candles, lastknownDocument) => {
  let tcandles = [...candles];

  atrAlgo(14, tcandles, lastknownDocument?.atr14);

  return tcandles;
};

export function atrAlgo(
  period: number,
  candles: ICandle[],
  prevATR?: number
): void {
  let idx = 0;

  if (!prevATR) {
    if (candles.length < period + 1) {
      throw new Error("Not enough values to calculate ATR");
    }

    let Isum = 0;
    for (idx = 1; idx < period + 1; idx++) {
      Isum += Math.max(
        parseFloat(candles[idx].high) - parseFloat(candles[idx].low),
        parseFloat(candles[idx].high) - parseFloat(candles[idx - 1].close),
        parseFloat(candles[idx - 1].close) - parseFloat(candles[idx].low)
      );
    }

    // Set inital ATR if it doesn't exist
    prevATR = Isum / period;
    candles[period].atr14 = prevATR;
  }

  const a = 2 / (period + 1);

  let ptr = Math.max(
    parseFloat(candles[idx].high) - parseFloat(candles[idx].low),
    parseFloat(candles[idx].high) - parseFloat(candles[idx - 1].close),
    parseFloat(candles[idx - 1].close) - parseFloat(candles[idx].low)
  );

  let patr = a * ptr + (1 - a) * prevATR;
  candles[idx].atr14 = patr;

  let tr = 0;
  let atr = 0;

  for (let x = idx + 1; x < candles.length; x++) {
    tr = Math.max(
      parseFloat(candles[x].high) - parseFloat(candles[x].low),
      parseFloat(candles[x].high) - parseFloat(candles[x - 1].close),
      parseFloat(candles[x - 1].close) - parseFloat(candles[x].low)
    );

    atr = a * tr + (1 - a) * patr;

    candles[x].atr14 = atr;
    patr = atr;
    ptr = tr;
  }
}
