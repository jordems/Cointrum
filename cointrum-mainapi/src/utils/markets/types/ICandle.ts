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

  forceindex13?: number;

  MACD?: number;

  RSI14?: number;

  SAR00202?: number;
}
