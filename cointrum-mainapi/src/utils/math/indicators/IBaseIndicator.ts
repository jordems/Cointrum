import ICandle from "../../markets/types/ICandle";

export type IBaseIndicator = (
  candles: ICandle[],
  prevCandles: ICandle[]
) => ICandle[];
