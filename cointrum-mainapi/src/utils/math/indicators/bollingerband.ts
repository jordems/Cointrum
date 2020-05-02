import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";
import { std } from "../std";

export const bollingerband: IBaseIndicator = (candles, lastknownDocument) => {
  let tcandles = [...candles];

  bollingerbandAlgo("upper", tcandles, lastknownDocument?.BBupper);
  bollingerbandAlgo("middle", tcandles, lastknownDocument?.BBmiddle);
  bollingerbandAlgo("lower", tcandles, lastknownDocument?.BBlower);

  return tcandles;
};

export function bollingerbandAlgo(
  band: "lower" | "middle" | "upper",
  candles: ICandle[],
  prevValue?: number
): number {
  try {
    const sma20 = smaAlgo(20, element, phdselements);
    switch (band) {
      case "lower":
        return sma20 - std(closingPrices) * 2;
      case "middle":
        return sma20;
      case "upper":
        return sma20 + std(closingPrices) * 2;
    }
  } catch (e) {
    return NaN;
  }
}
