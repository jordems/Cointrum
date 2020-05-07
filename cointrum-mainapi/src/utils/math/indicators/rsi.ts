import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";

export const rsi: IBaseIndicator = (candles, lastknownDocuments) => {
  let results = [...candles];

  const prevCandles = ArrayICandleAdapter(lastknownDocuments);

  results = rsiAlgo(candles, prevCandles);

  return results;
};

export function rsiAlgo(
  candles: ICandle[],
  prevCandles?: ICandle[]
): ICandle[] {
  // Convert lastknownDocuments to type ICandle
  let lastknownCandles: ICandle[] = prevCandles ? prevCandles : [];
  let results = [...candles];

  if (candles.length === 0) {
    return [];
  }

  let avggain: number;
  let avgloss: number;
  let prevavggain: number;
  let prevavgloss: number;

  if (lastknownCandles.length === 0) {
    for (let x = 0; x < 13; x++) {
      results[x].RSI14 = -1;
      results[x].RSIGAIN = -1;
      results[x].RSILOSS = -1;
    }

    const elements = results.slice(0, 14);
    prevavggain = getInitalGain(elements) / 14;
    prevavgloss = getInitalLoss(elements) / 14;

    results[13].RSI14 = 100 - 100 / (1 + prevavggain / prevavgloss);
    results[13].RSIGAIN = prevavggain;
    results[13].RSILOSS = prevavgloss;

    for (let x = 14; x < candles.length; x++) {
      let currentGain =
        parseFloat(candles[x].close) - parseFloat(candles[x - 1].close);
      currentGain = currentGain < 0 ? 0 : currentGain;
      let currentLoss =
        parseFloat(candles[x].close) - parseFloat(candles[x - 1].close);
      currentLoss = currentLoss > 0 ? 0 : Math.abs(currentLoss);

      avggain = (prevavggain * 13 + currentGain) / 14;
      avgloss = (prevavgloss * 13 + currentLoss) / 14;

      results[x].RSI14 = 100 - 100 / (1 + avggain / avgloss);
      results[x].RSIGAIN = avggain;
      results[x].RSILOSS = avgloss;

      prevavggain = avggain;
      prevavgloss = avgloss;
    }
  } else {
    const lastCandle = lastknownCandles[lastknownCandles.length - 1];

    prevavggain = lastCandle.RSIGAIN ? lastCandle.RSIGAIN : -1;
    prevavgloss = lastCandle.RSILOSS ? lastCandle.RSILOSS : -1;

    let currentGain =
      parseFloat(candles[0].close) - parseFloat(lastCandle.close);
    currentGain = currentGain < 0 ? 0 : currentGain;
    let currentLoss =
      parseFloat(candles[0].close) - parseFloat(lastCandle.close);
    currentLoss = currentLoss > 0 ? 0 : Math.abs(currentLoss);

    avggain = (prevavggain * 13 + currentGain) / 14;
    avgloss = (prevavgloss * 13 + currentLoss) / 14;

    results[0].RSI14 = 100 - 100 / (1 + avggain / avgloss);
    results[0].RSIGAIN = avggain;
    results[0].RSILOSS = avgloss;

    prevavggain = avggain;
    prevavgloss = avgloss;

    for (let x = 1; x < candles.length; x++) {
      let currentGain =
        parseFloat(candles[x].close) - parseFloat(candles[x - 1].close);
      currentGain = currentGain < 0 ? 0 : currentGain;
      let currentLoss =
        parseFloat(candles[x].close) - parseFloat(candles[x - 1].close);
      currentLoss = currentLoss > 0 ? 0 : Math.abs(currentLoss);

      avggain = (prevavggain * 13 + currentGain) / 14;
      avgloss = (prevavgloss * 13 + currentLoss) / 14;

      results[x].RSI14 = 100 - 100 / (1 + avggain / avgloss);
      results[x].RSIGAIN = avggain;
      results[x].RSILOSS = avgloss;

      prevavggain = avggain;
      prevavgloss = avgloss;
    }
  }
  return results;
}

function getInitalGain(elements: ICandle[]): number {
  let gain = 0;

  for (let x = 1; x < elements.length; x++) {
    if (parseFloat(elements[x].close) > parseFloat(elements[x - 1].close)) {
      gain += parseFloat(elements[x].close) - parseFloat(elements[x - 1].close);
    }
  }
  return gain;
}

function getInitalLoss(elements: ICandle[]): number {
  let loss = 0;

  for (let x = 1; x < elements.length; x++) {
    if (parseFloat(elements[x].close) < parseFloat(elements[x - 1].close)) {
      loss += Math.abs(
        parseFloat(elements[x].close) - parseFloat(elements[x - 1].close)
      );
    }
  }
  return loss;
}
