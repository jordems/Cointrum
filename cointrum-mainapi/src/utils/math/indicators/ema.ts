import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";

export const ema: IBaseIndicator = (candles, lastknownDocument) => {
  for (const ele of phdselements) {
    ele.ema12 = emaAlgo(12, ele, extraelements);
    ele.ema26 = emaAlgo(26, ele, extraelements);
  }

  return phdselements;
};

export function emaAlgo(
  windowSize: number,
  element: ICandle,
  phdselements: ICandle[]
): number {
  let startingIdx = -1;

  phdselements.forEach((ele, idx) => {
    if (ele.openTime === element.openTime) {
      startingIdx = idx;
    }
  });

  try {
    const prevElements = phdselements.slice(
      startingIdx - (windowSize - 1),
      startingIdx
    );
    const allElements = [...prevElements, element];

    let prevEma = smaAlgo(windowSize, allElements[0], phdselements);

    let ema = 0;

    const k = 2 / (windowSize + 1);
    for (let x = 1; x < allElements.length; x++) {
      ema = parseFloat(allElements[x].close) * k + prevEma * (1 - k);

      prevEma = ema;
    }
    return ema;
  } catch (e) {
    return NaN;
  }
}
