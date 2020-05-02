import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";
import { emaAlgo } from "./ema";

export const elderray: IBaseIndicator = (candles, lastknownDocument) => {
  for (const ele of phdselements) {
    ele.ElderRay = elderrayAlgo(ele, extraelements);
  }
  return phdselements;
};

function elderrayAlgo(
  element: ICandle,
  phdselements: ICandle[]
): [number, number] {
  try {
    const ema13 = emaAlgo(13, element, phdselements);

    return [parseFloat(element.high) - ema13, parseFloat(element.low) - ema13];
  } catch (e) {
    return [NaN, NaN];
  }
}
