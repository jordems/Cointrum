export default interface ICandle {
    openTime: Date;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: Date;
    quoteVolume: string;
    trades: number;
    baseAssetVolume: string;
    quoteAssetVolume: string;
}