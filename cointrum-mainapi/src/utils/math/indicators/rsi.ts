import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const rsi: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.RSI14 = rsiAlgo(14, ele, extraelements);
  }

  return phdselements;
};

export function rsiAlgo(
  windowSize: number,
  element: ICandle,
  phdselements: ICandle[]
): number {
  const startingIdx = phdselements.indexOf(element);

  try {
    // Calculate Prev Gain and Loss
    const PprevElements = phdselements.slice(
      startingIdx - (windowSize + 1),
      startingIdx
    );
    const PallElements = [...PprevElements];
    const prevavggain = getGain(PallElements) / 14;
    const prevavgloss = getGain(PallElements) / 14;

    // Calculate Current Average Gain and Loss
    const prevElements = phdselements.slice(
      startingIdx - windowSize,
      startingIdx
    );
    const allElements = [...prevElements, element];
    const avggain = (prevavggain * 13 + getGain(allElements)) / 14;
    const avgloss = (prevavgloss * 13 + getLoss(allElements)) / 14;

    return 100 - 100 / (1 + avggain / avgloss);
  } catch (e) {
    return NaN;
  }
}

function getGain(elements: ICandle[]) {
  let gain = 0;

  for (let x = 1; x < elements.length; x++) {
    if (parseFloat(elements[x].close) > parseFloat(elements[x - 1].close)) {
      gain += parseFloat(elements[x].close) - parseFloat(elements[x - 1].close);
    }
  }
  return gain;
}

function getLoss(elements: ICandle[]) {
  let loss = 0;

  for (let x = 1; x < elements.length; x++) {
    if (parseFloat(elements[x].close) < parseFloat(elements[x - 1].close)) {
      loss += parseFloat(elements[x - 1].close) - parseFloat(elements[x].close);
    }
  }
  return loss;
}
