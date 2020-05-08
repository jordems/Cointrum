import { IPHDSElement } from "models";
import { IOHLCData } from "./IOHLCData";

export function candleConversion(candledata: {
  [_id: number]: IPHDSElement;
}): IOHLCData[] {
  const candleKeys = Object.keys(candledata).sort();

  let convertedCandles: IOHLCData[] = [];

  for (const key of candleKeys) {
    const candle = candledata[parseInt(key)];

    convertedCandles.push({
      date: new Date(candle.openTime),
      ...candle,
    });
  }

  return convertedCandles;
}
