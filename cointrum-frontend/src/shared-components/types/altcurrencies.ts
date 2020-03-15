export const altcurrencies = [
  "BNB",
  "BTC",
  "ETH",
  "ADA",
  "NEO",
  "TRX",
  "XVG"
] as const;

export type IAltCurrencies = typeof altcurrencies[number];
