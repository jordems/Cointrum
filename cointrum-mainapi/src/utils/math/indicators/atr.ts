import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const atr: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.atr14 = atrAlgo(14, ele, extraelements);
  }

  return phdselements;
};

export function atrAlgo(
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

  const tr =
    Math.max(parseInt(element.high), parseInt(prevDay.close)) -
    Math.min(parseInt(element.low), parseInt(prevDay.close));

  return (
    (atrAlgo(windowSize, prevDay, phdselements, tcount + 1) * (windowSize - 1) +
      tr) /
    windowSize
  );
}
