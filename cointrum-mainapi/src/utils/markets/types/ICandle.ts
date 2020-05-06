import { IPHDSElement } from "../../../models/PHDSElement";

export default interface ICandle {
  discriminator: "ICANDLE";
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

export function instanceofICandle(object: any): object is ICandle {
  return object.discriminator === "ICANDLE";
}

export function ICandleAdapter(phdselement: IPHDSElement): ICandle {
  return {
    discriminator: "ICANDLE",
    openTime: phdselement.openTime,
    open: phdselement.open.toString(),
    high: phdselement.high.toString(),
    low: phdselement.low.toString(),
    close: phdselement.close.toString(),
    volume: phdselement.volume.toString(),
    quoteVolume: phdselement.quoteVolume.toString(),
    baseAssetVolume: phdselement.baseAssetVolume.toString(),
    quoteAssetVolume: phdselement.quoteAssetVolume.toString(),

    closeTime: phdselement.closeTime,
    trades: phdselement.trades,
    atr14: phdselement.atr14,
    BBmiddle: phdselement.BBmiddle,
    BBupper: phdselement.BBupper,
    BBlower: phdselement.BBlower,

    ElderRay: phdselement.ElderRay,

    ema26: phdselement.ema26,
    ema12: phdselement.ema12,
    ema13: phdselement.ema13,

    forceindex13: phdselement.forceindex13,

    MACD: phdselement.MACD,

    RSIGAIN: phdselement.RSIGAIN,
    RSILOSS: phdselement.RSILOSS,
    RSI14: phdselement.RSI14,

    PSAR_EP: phdselement.PSAR_EP,
    PSAR_ACC: phdselement.PSAR_ACC,
    PSAR_INIT: phdselement.PSAR_INIT,
    PSAR_TREND: phdselement.PSAR_TREND,
    PSAR: phdselement.PSAR,
  };
}

export function ArrayICandleAdapter(
  phdselements: IPHDSElement[] | ICandle[] = []
): ICandle[] {
  let candles: ICandle[] = [];

  for (const ele of phdselements) {
    if (instanceofICandle(ele)) {
      candles.push(ele);
    } else {
      candles.push(ICandleAdapter(ele));
    }
  }
  return candles;
}
