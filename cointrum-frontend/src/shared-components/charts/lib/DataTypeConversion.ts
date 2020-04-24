import { IPHDSElement } from "models";
import { BarData, UTCTimestamp } from "lightweight-charts";

export function candleConversion(candledata: {
  [_id: number]: IPHDSElement;
}): BarData[] {
  const candleKeys = Object.keys(candledata).sort();

  let convertedCandles: BarData[] = [];

  for (const key of candleKeys) {
    const candle = candledata[parseInt(key)];

    convertedCandles.push({
      time: candle.openTime as UTCTimestamp,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    });
  }

  return convertedCandles;
}
