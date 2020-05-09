import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";

export const forceindex: IBaseIndicator = (candles, prevCandles) => {
  let tcandles = [...candles];

  const forceidx13values = forceindex13Algo(candles, prevCandles);

  for (let x = 0; x < tcandles.length; x++) {
    tcandles[x].forceindex13 = forceidx13values[x];
  }

  return tcandles;
};

export function forceindex13Algo(
  candles: ICandle[],
  prevCandles: ICandle[]
): number[] {
  if (candles.length === 0) {
    return [];
  }

  let resultingf13Values: number[] = [];

  let fullist = [...prevCandles, ...candles];

  let idx = 0;
  let prevF13Ema;
  const k = 2 / (13 + 1);

  if (prevCandles.length === 0) {
    // Fill first values with invalue ema
    for (idx = 0; idx < 13; idx++) {
      resultingf13Values.push(-1);
    }
    // Generate first forceema13 with sma of f1's

    prevF13Ema = smaofF1(fullist.slice(0, 14));

    resultingf13Values.push(prevF13Ema);

    let f13ema = 0;

    for (let x = idx + 1; x < fullist.length; x++) {
      const fi1 =
        (parseFloat(fullist[x].close) - parseFloat(fullist[x - 1].close)) *
        parseFloat(fullist[x].volume);

      f13ema = fi1 * k + prevF13Ema * (1 - k);

      resultingf13Values.push(f13ema);
      prevF13Ema = f13ema;
    }
  } else {
    let tema = prevCandles[prevCandles.length - 1].forceindex13;

    if (!tema || tema === -1) {
      return forceindex13Algo(candles, []);
    }

    const tfi1 =
      (parseFloat(candles[0].close) -
        parseFloat(prevCandles[prevCandles.length - 1].close)) *
      parseFloat(candles[0].volume);

    prevF13Ema = tfi1 * k + tema * (1 - k);
    resultingf13Values.push(prevF13Ema);

    let f13ema = 0;

    for (let x = 1; x < candles.length; x++) {
      const fi1 =
        (parseFloat(candles[x].close) - parseFloat(candles[x - 1].close)) *
        parseFloat(candles[x].volume);
      f13ema = fi1 * k + prevF13Ema * (1 - k);
      resultingf13Values.push(f13ema);
      prevF13Ema = f13ema;
    }
  }

  return resultingf13Values;
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
