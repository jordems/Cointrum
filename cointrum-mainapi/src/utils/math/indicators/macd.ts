import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";
import { emaAlgo } from "./ema";

export const macd: IBaseIndicator = (candles, prevCandles) => {
  let tcandles = [...candles];

  tcandles = macdAlgo(candles, prevCandles);

  return tcandles;
};

export function macdAlgo(
  candles: ICandle[],
  prevCandles: ICandle[]
): ICandle[] {
  let result = [...candles];

  const ema12s = emaAlgo(12, candles, prevCandles);
  const ema26s = emaAlgo(26, candles, prevCandles);

  for (let x = 0; x < result.length; x++) {
    result[x].MACD = ema12s[x] - ema26s[x];
  }
  return result;
}
