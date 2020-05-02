import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const atr: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.atr14 = atrAlgo(14, ele, extraelements);
  }

  return phdselements;
};

export function atrAlgo(
  period: number,
  element: ICandle,
  phdselements: ICandle[],
  count?: number
): number {
  let startingIdx = -1;

  phdselements.forEach((ele, idx) => {
    if (ele.openTime === element.openTime) {
      startingIdx = idx;
    }
  });

  try {
    const IprevElements = phdselements.slice(
      startingIdx - period * 2,
      startingIdx - period
    );

    let Isum = 0;
    for (let x = 1; x < IprevElements.length; x++) {
      Isum += Math.max(
        parseFloat(IprevElements[x].high) - parseFloat(IprevElements[x].low),
        parseFloat(IprevElements[x].high) -
          parseFloat(IprevElements[x - 1].close),
        parseFloat(IprevElements[x - 1].close) -
          parseFloat(IprevElements[x].low)
      );
    }

    const Iatr = Isum / period;

    const prevElements = phdselements.slice(startingIdx - period, startingIdx);
    const allElements = [...prevElements, element];

    const a = 2 / (period + 1);

    let ptr = Math.max(
      parseFloat(allElements[1].high) - parseFloat(allElements[1].low),
      parseFloat(allElements[1].high) - parseFloat(allElements[0].close),
      parseFloat(allElements[0].close) - parseFloat(allElements[1].low)
    );

    let patr = a * ptr + (1 - a) * Iatr;

    let tr = 0;
    let atr = 0;

    for (let x = 2; x < allElements.length; x++) {
      tr = Math.max(
        parseFloat(allElements[x].high) - parseFloat(allElements[x].low),
        parseFloat(allElements[x].high) - parseFloat(allElements[x - 1].close),
        parseFloat(allElements[x - 1].close) - parseFloat(allElements[x].low)
      );

      atr = a * tr + (1 - a) * patr;

      patr = atr;
      ptr = tr;
    }

    return atr;
  } catch (e) {
    return NaN;
  }
}
