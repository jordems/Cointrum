export const exchanges = ["Binance"] as const;

export type IExchanges = typeof exchanges[number];
