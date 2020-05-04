import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ICandleAdapter } from "../../markets/types/ICandle";
import { emaAlgo } from "./ema";
import { IPHDSElement } from "../../../models/PHDSElement";

export const elderray: IBaseIndicator = (candles, lastknownDocuments) => {
  let tcandles = [...candles];

  tcandles = elderrayAlgo(candles, lastknownDocuments);

  return tcandles;
};

function elderrayAlgo(
  candles: ICandle[],
  lastknownDocuments?: IPHDSElement[]
): ICandle[] {
  let ema13elements = emaAlgo(13, [...candles], lastknownDocuments);

  let results = [...candles];
  for (let x = 0; x < candles.length; x++) {
    if (ema13elements[x] === NaN) {
      results[x].ElderRay = [NaN, NaN];
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
