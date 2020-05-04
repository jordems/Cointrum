import ICandle from "../../markets/types/ICandle";

export function smaAlgo(candles: ICandle[]): number {
  let sum = 0;
  for (const candle of candles) {
    sum += parseFloat(candle.close);
  }
  return sum / candles.length;
}
