import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, {
  ICandleAdapter,
  ArrayICandleAdapter,
} from "../../markets/types/ICandle";
import { IPHDSElement } from "../../../models/PHDSElement";

export const forceindex: IBaseIndicator = (candles, lastknownDocuments) => {
  let tcandles = [...candles];

  const prevCandles = ArrayICandleAdapter(lastknownDocuments);

  const forceidx13values = forceindex13Algo(candles, prevCandles);

  for (let x = 0; x < tcandles.length; x++) {
    tcandles[x].forceindex13 = forceidx13values[x];
  }

  return tcandles;
};

export function forceindex13Algo(
  candles: ICandle[],
  prevCandles?: ICandle[]
): number[] {
  let resultingemaValues: number[] = [];
  // Convert lastknownDocuments to type ICandle
  let lastknownCandles: ICandle[] = prevCandles ? prevCandles : [];

  let fullist = [...lastknownCandles, ...candles];

  let idx = 0;
  let prevF13Ema;
  const k = 2 / (13 + 1);

  if (lastknownCandles.length === 0) {
    // Fill first values with invalue ema
    for (idx = 0; idx < 13; idx++) {
      resultingemaValues.push(-1);
    }
    // Generate first forceema13 with sma of f1's

    prevF13Ema = smaofF1(fullist.slice(0, 14));

    resultingemaValues.push(prevF13Ema);

    let f13ema = 0;

    for (let x = idx + 1; x < fullist.length; x++) {
      const fi1 =
        (parseFloat(fullist[x].close) - parseFloat(fullist[x - 1].close)) *
        parseFloat(fullist[x].volume);

      f13ema = fi1 * k + prevF13Ema * (1 - k);

      resultingemaValues.push(f13ema);
      prevF13Ema = f13ema;
    }
  } else {
    let tema = lastknownCandles[lastknownCandles.length - 1].forceindex13;

    if (!tema) {
      tema = -1;
    }
    idx = lastknownCandles.length - 1;

    const fi1 =
      (parseFloat(fullist[idx].close) - parseFloat(fullist[idx - 1].close)) *
      parseFloat(fullist[idx].volume);

    prevF13Ema = fi1 * k + tema * (1 - k);
    resultingemaValues.push(prevF13Ema);

    let f13ema = 0;

    for (let x = 1; x < candles.length; x++) {
      const fi1 =
        (parseFloat(candles[x].close) - parseFloat(candles[x - 1].close)) *
        parseFloat(candles[x].volume);
      f13ema = fi1 * k + prevF13Ema * (1 - k);
      resultingemaValues.push(f13ema);
      prevF13Ema = f13ema;
    }
  }

  return resultingemaValues;
}

function smaofF1(candles: ICandle[]): number {
  let sum = 0;
  for (let x = 1; x < candles.length; x++) {
    const fi1 =
      (parseFloat(candles[x].close) - parseFloat(candles[x - 1].close)) *
      parseFloat(candles[x].volume);
    sum += fi1;
  }
  return sum / candles.length - 1;
}
