import {
  ema,
  atr,
  bollingerband,
  elderray,
  forceindex,
  macd,
  rsi,
  sar,
} from "../../utils/math/indicators";
import ICandle, { ArrayICandleAdapter } from "../markets/types/ICandle";
import { IPHDSElement } from "../../models/PHDSElement";

export function IndicatorDecorator(
  inputCandles: ICandle[],
  lastKnownDocuments?: IPHDSElement[] | ICandle[]
) {
  let candles = [...inputCandles];

  const prevCandles = ArrayICandleAdapter(lastKnownDocuments);

  const indicators = [
    atr,
    bollingerband,
    elderray,
    ema,
    forceindex,
    macd,
    rsi,
    sar,
  ];
  for (const indicator of indicators) {
    candles = indicator(candles, prevCandles);
  }

  return candles;
}
