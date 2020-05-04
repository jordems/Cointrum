import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ICandleAdapter } from "../../markets/types/ICandle";
import { IPHDSElement } from "../../../models/PHDSElement";

export const rsi: IBaseIndicator = (candles, lastknownDocuments) => {
  let results = [...candles];

  results = rsiAlgo(candles, lastknownDocuments);

  return results;
};

export function rsiAlgo(
  candles: ICandle[],
  lastknownDocuments?: IPHDSElement[]
): ICandle[] {
  // Convert lastknownDocuments to type ICandle
  let lastknownCandles: ICandle[] = [];
  if (lastknownDocuments) {
    for (const phdselement of lastknownDocuments) {
      lastknownCandles.push(ICandleAdapter(phdselement));
    }
  }
  let results = [...candles];

  let fullist = [...[...lastknownCandles].reverse(), ...candles];

  let avggain: number;
  let avgloss: number;
  let prevavggain: number;
  let prevavgloss: number;

  const k = 2 / (14 + 1);

  if (lastknownCandles.length === 0) {
    for (let x = 0; x < 13; x++) {
      results[13].RSI14 = NaN;
      results[13].RSIGAIN = NaN;
      results[13].RSILOSS = NaN;
    }

    const elements = results.slice(0, 14);
    prevavggain = getGain(elements) * k;
    prevavgloss = getLoss(elements) * k;

    results[13].RSI14 = 100 - 100 / (1 + prevavggain / prevavgloss);
    results[13].RSIGAIN = prevavggain;
    results[13].RSILOSS = prevavgloss;

    for (let x = 14; x < candles.length; x++) {
      const elements = fullist.slice(x - 13, x + 1);

      avggain = prevavggain * (1 - k) + getGain(elements) * k;
      avgloss = prevavgloss * (1 - k) + getLoss(elements) * k;

      results[x].RSI14 = 100 - 100 / (1 + avggain / avgloss);
      results[x].RSIGAIN = avggain;
      results[x].RSILOSS = avgloss;

      prevavggain = avggain;
      prevavgloss = avgloss;
    }
  } else {
    prevavggain = lastknownCandles[0].RSIGAIN ? lastknownCandles[0].RSIGAIN : 0;
    prevavgloss = lastknownCandles[0].RSILOSS ? lastknownCandles[0].RSILOSS : 0;

    for (let x = 0; x < candles.length; x++) {
      const elements = fullist.slice(
        lastknownCandles.length - 14 + x,
        lastknownCandles.length + x
      );

      avggain = prevavggain * (1 - k) + getGain(elements) * k;
      avgloss = prevavgloss * (1 - k) + getLoss(elements) * k;

      results[x].RSI14 = 100 - 100 / (1 + avggain / avgloss);
      results[x].RSIGAIN = avggain;
      results[x].RSILOSS = avgloss;

      prevavggain = avggain;
      prevavgloss = avgloss;
    }
  }
  return results;
}

function getGain(elements: ICandle[]) {
  let gain = 0;

  for (let x = 1; x < elements.length; x++) {
    if (parseFloat(elements[x].close) > parseFloat(elements[x - 1].close)) {
      gain += parseFloat(elements[x].close) - parseFloat(elements[x - 1].close);
    }
  }
  return gain;
}

function getLoss(elements: ICandle[]) {
  let loss = 0;

  for (let x = 1; x < elements.length; x++) {
    if (parseFloat(elements[x].close) < parseFloat(elements[x - 1].close)) {
      loss += parseFloat(elements[x - 1].close) - parseFloat(elements[x].close);
    }
  }
  return loss;
}
