#### /cointrum-mainapi/services/phds

## Permanent Historical Data Set (PHDS)

The phds is a set of data containing all current pricing history of currency to currency exchanges. If the user is requesting for data that isn't in the phds, then it will be pulled from a source like BinanceAPI then added to our dataset (Basically in a sense cacheing the information, so external pulls are minimized).

### Main Use Case

1. Given: `exchange`, `basecurrency`, `altcurrency`, `interval`, and optionally a specified `start` and `end` timeframe. Return `IPHDSElement`'s from phds from within the timeframe of `basecurrency`-`altcurrency`

   **Chart Types**:

   - _Candles_

### Additive Cases

1. Adding Extra charttypes such as `MAC-D`, `Volume-Chart`, `Base-line`, ... Indicator Types (Look on Trading View for examples)
2. This Service should Ideally be seperated into it's own express services (kuberneties)
3. When creating the Trading Temporary Current Data Set, we can make it so when it pulls data though websocket, automaitcally funnel into phds So, less binance API calls are required in future.
