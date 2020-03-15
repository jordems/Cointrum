export const basecurrencies = ["BNB", "BTC", "ETH", "USDT"] as const;

export type IBaseCurrencies = typeof basecurrencies[number];
