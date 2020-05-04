import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ICandleAdapter } from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";
import { IPHDSElement } from "../../../models/PHDSElement";

export const ema: IBaseIndicator = (candles, lastknownDocuments) => {
  let results = [...candles];

  const ema26s = emaAlgo(26, results, lastknownDocuments);
  const ema12s = emaAlgo(12, results, lastknownDocuments);

  for (let x = 0; x < results.length; x++) {
    results[x].ema26 = ema26s[x];
    results[x].ema12 = ema12s[x];
  }

  return results;
};

export function emaAlgo(
  windowSize: 12 | 13 | 26,
  candles: ICandle[],
  lastknownDocuments?: IPHDSElement[]
): number[] {
  let resultingemaValues: number[] = [];
  // Convert lastknownDocuments to type ICandle
  let lastknownCandles: ICandle[] = [];
  if (lastknownDocuments) {
    for (const phdselement of lastknownDocuments) {
      lastknownCandles.push(ICandleAdapter(phdselement));
    }
  }
  let fullist = [...[...lastknownCandles].reverse(), ...candles];

  let idx = 0;
  let prevEma;
  const k = 2 / (windowSize + 1);

  if (lastknownCandles.length === 0) {
    // Fill first values with invalue ema
    for (idx = 0; idx < windowSize - 1; idx++) {
      resultingemaValues.push(NaN);
    }
    // Generate first ema with sma
    prevEma = smaAlgo(fullist.slice(0, windowSize));
    resultingemaValues.push(prevEma);

    let ema = 0;

    for (let x = idx + 1; x < fullist.length; x++) {
      ema = parseFloat(fullist[x].close) * k + prevEma * (1 - k);
      resultingemaValues.push(ema);
      prevEma = ema;
    }
  } else {
    let tema;
    if (windowSize === 12) {
      tema = lastknownCandles[0].ema12;
    } else if (windowSize === 13) {
      tema = lastknownCandles[0].ema13;
    } else if (windowSize === 26) {
      tema = lastknownCandles[0].ema26;
    }
    if (!tema) {
      throw new Error("Error Getting prev Values for EMA" + windowSize);
    }

    prevEma = parseFloat(fullist[idx].close) * k + tema * (1 - k);
    resultingemaValues.push(prevEma);

    let ema = 0;

    for (let x = 1; x < candles.length; x++) {
      ema = parseFloat(candles[x].close) * k + prevEma * (1 - k);
      resultingemaValues.push(ema);
      prevEma = ema;
    }
  }

  return resultingemaValues;
}
