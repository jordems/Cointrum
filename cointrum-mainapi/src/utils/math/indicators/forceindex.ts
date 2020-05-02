import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const forceindex: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.forceindex13 = forceindexAlgo(13, ele, extraelements);
  }

  return phdselements;
};

export function forceindexAlgo(
  windowSize: number,
  element: ICandle,
  phdselements: ICandle[],
  count?: number
): number {
  let tcount = count;
  if (!tcount) {
    tcount = 1;
  }

  if (tcount > 13) {
    return 0;
  }

  const startingIdx = phdselements.indexOf(element);

  const prevDay = phdselements[startingIdx - 1];
  if (!prevDay) {
    return NaN;
  }
  const fi1 =
    (parseFloat(element.close) - parseFloat(prevDay.close)) *
    parseFloat(element.volume);
  const k = 2 / (windowSize + 1);
  return (
    fi1 * k +
    forceindexAlgo(windowSize, prevDay, phdselements, tcount + 1) * (1 - k)
  );
}
