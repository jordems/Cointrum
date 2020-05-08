import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";

export const ema: IBaseIndicator = (candles, prevCandles) => {
  let results = [...candles];

  const ema26s = emaAlgo(26, results, prevCandles);
  const ema12s = emaAlgo(12, results, prevCandles);

  for (let x = 0; x < results.length; x++) {
    results[x].ema26 = ema26s[x];
    results[x].ema12 = ema12s[x];
  }

  return results;
};

export function emaAlgo(
  windowSize: 12 | 13 | 26,
  candles: ICandle[],
  prevCandles: ICandle[]
): number[] {
  let resultingemaValues: number[] = [];
  // Convert lastknownDocuments to type ICandle

  let fullist = [...prevCandles, ...candles];
  let idx = 0;
  let prevEma;
  const k = 2 / (windowSize + 1);

  if (prevCandles.length === 0) {
    // Fill first values with invalue ema
    for (idx = 0; idx < windowSize - 1; idx++) {
      resultingemaValues.push(-1);
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
    const lastCandle = prevCandles[prevCandles.length - 1];
    if (windowSize === 12) {
      tema = lastCandle.ema12;
    } else if (windowSize === 13) {
      tema = lastCandle.ema13;
    } else if (windowSize === 26) {
      tema = lastCandle.ema26;
    }
    if (!tema || tema === -1) {
      console.log("WHAT", lastCandle);
      return emaAlgo(windowSize, candles, []);
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
