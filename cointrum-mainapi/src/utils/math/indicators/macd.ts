import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";
import { emaAlgo } from "./ema";
import { IPHDSElement } from "../../../models/PHDSElement";

export const macd: IBaseIndicator = (candles, lastknownDocuments) => {
  let tcandles = [...candles];

  tcandles = macdAlgo(candles, lastknownDocuments);

  return tcandles;
};

export function macdAlgo(
  candles: ICandle[],
  lastknownDocuments?: IPHDSElement[]
): ICandle[] {
  let result = [...candles];

  const ema12s = emaAlgo(12, candles, lastknownDocuments);
  const ema26s = emaAlgo(26, candles, lastknownDocuments);

  for (let x = 0; x < result.length; x++) {
    result[x].MACD = ema12s[x] - ema26s[x];
  }
  return result;
}
