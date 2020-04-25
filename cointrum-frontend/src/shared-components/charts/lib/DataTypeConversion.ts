import { IPHDSElement } from "models";

export function candleConversion(candledata: { [_id: number]: IPHDSElement }) {
  const candleKeys = Object.keys(candledata).sort();

  let convertedCandles: any[] = [];

  for (const key of candleKeys) {
    const candle = candledata[parseInt(key)];

    convertedCandles.push({
      date: new Date(candle.openTime),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      volume: candle.volume,
    });
  }

  return convertedCandles;
}
