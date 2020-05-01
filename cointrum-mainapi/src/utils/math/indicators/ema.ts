import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const ema: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.ema12 = emaAlgo(12, ele, extraelements);
    ele.ema26 = emaAlgo(26, ele, extraelements);
  }

  return phdselements;
};

export function emaAlgo(
  windowSize: number,
  element: ICandle,
  phdselements: ICandle[],
  count?: number
): number {
  let tcount = count;
  if (!tcount) {
    tcount = 1;
  }

  if (tcount > windowSize) {
    return 0;
  }

  const startingIdx = phdselements.findIndex(
    (ele) => ele.openTime === element.openTime
  );

  const prevDay = phdselements[startingIdx - 1];
  if (!prevDay) {
    return NaN;
  }

  const k = 2 / (windowSize + 1);
  return (
    parseInt(element.close) * k +
    emaAlgo(windowSize, prevDay, phdselements, tcount + 1) * (1 - k)
  );
}
