import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";
import { emaAlgo } from "./ema";

export const macd: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.MACD = macdAlgo(ele, extraelements);
  }

  return phdselements;
};

export function macdAlgo(element: ICandle, phdselements: ICandle[]): number {
  return (
    emaAlgo(12, element, phdselements) - emaAlgo(26, element, phdselements)
  );
}
