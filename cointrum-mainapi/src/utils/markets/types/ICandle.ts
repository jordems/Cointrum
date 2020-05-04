import { IPHDSElement } from "../../../models/PHDSElement";

export default interface ICandle {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteVolume: string;
  trades: number;
  baseAssetVolume: string;
  quoteAssetVolume: string;

  atr14?: number;

  BBmiddle?: number;
  BBupper?: number;
  BBlower?: number;

  ElderRay?: [number, number];

  ema26?: number;
  ema12?: number;
  ema13?: number;

  forceindex13?: number;

  MACD?: number;

  RSIGAIN?: number;
  RSILOSS?: number;
  RSI14?: number;

  PSAR_EP?: number;
  PSAR_ACC?: number;
  PSAR_INIT?: number;
  PSAR_TREND?: "Falling" | "Rising";
  PSAR?: number;
}

export function ICandleAdapter(phdselement: IPHDSElement): ICandle {
  return {
    ...phdselement,
    open: phdselement.open.toString(),
    high: phdselement.high.toString(),
    low: phdselement.low.toString(),
    close: phdselement.close.toString(),
    volume: phdselement.volume.toString(),
    quoteVolume: phdselement.quoteVolume.toString(),
    baseAssetVolume: phdselement.baseAssetVolume.toString(),
    quoteAssetVolume: phdselement.quoteAssetVolume.toString(),
  };
}
