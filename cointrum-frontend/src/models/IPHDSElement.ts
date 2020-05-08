export interface IPHDSElement {
  discriminator: "IPHDSELEMENT";
  _id: number;
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteVolume: number;
  trades: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;

  atr14: number;

  BBmiddle: number;
  BBupper: number;
  BBlower: number;

  ElderRay: [number, number];

  ema26: number;
  ema12: number;
  ema13: number;

  forceindex13: number;

  MACD: number;

  RSIGAIN: number;
  RSILOSS: number;
  RSI14: number;

  PSAR_EP: number;
  PSAR_ACC: number;
  PSAR_INIT: number;
  PSAR_TREND: "Falling" | "Rising";
  PSAR: number;
  created_date: Date;
}
