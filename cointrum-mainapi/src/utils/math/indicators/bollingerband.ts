import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";
import { smaAlgo } from "./sma";
import { std } from "../std";

export const bollingerband: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.BBupper = bollingerbandAlgo("upper", ele, extraelements);
    ele.BBlower = bollingerbandAlgo("lower", ele, extraelements);
    ele.BBmiddle = bollingerbandAlgo("middle", ele, extraelements);
  }

  return phdselements;
};

export function bollingerbandAlgo(
  band: "lower" | "middle" | "upper",
  element: ICandle,
  phdselements: ICandle[]
): number {
  const startingIdx = phdselements.indexOf(element);

  try {
    const prevElements = phdselements.slice(startingIdx - 20, startingIdx);

    const allElements = [...prevElements, element];

    let closingPrices: number[] = [];

    for (const ele of allElements) {
      closingPrices.push(parseFloat(ele.close));
    }

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
