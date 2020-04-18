#### /cointrum-mainapi/services/phds

## Permanent Historical Data Set (PHDS)

The phds is a set of data containing all current pricing history of currency to currency exchanges. If the user is requesting for data that isn't in the phds, then it will be pulled from a source like BinanceAPI then added to our dataset (Basically in a sense cacheing the information, so external pulls are minimized).

### Main Use Case

1. Given: `basecurrency`, `altcurrency`, `charttype`, and specified `timeframe`. Return `chartdata` from phds from within `timeframe` of `basecurrency`-`altcurrency`

   **Chart Types**:

   - _Candles_

### Additive Cases

1. Adding Extra charttypes such as `MAC-D`, `Volume-Chart`, `Base-line`, ... Indicator Types (Look on Trading View for examples)
