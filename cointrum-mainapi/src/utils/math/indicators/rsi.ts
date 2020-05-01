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
  const startingIdx = phdselements.findIndex(
    (ele) => ele.openTime === element.openTime
  );

  try {
    // Calculate Prev Gain and Loss
    const PprevElements = phdselements.splice(
      startingIdx - (windowSize + 1),
      startingIdx
    );
    const PallElements = [...PprevElements];
    const prevavggain = getGain(PallElements) / 14;
    const prevavgloss = getGain(PallElements) / 14;

    // Calculate Current Average Gain and Loss
    const prevElements = phdselements.splice(
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
    if (parseInt(elements[x].close) > parseInt(elements[x - 1].close)) {
      gain += parseInt(elements[x].close) - parseInt(elements[x - 1].close);
    }
  }
  return gain;
}

function getLoss(elements: ICandle[]) {
  let loss = 0;

  for (let x = 1; x < elements.length; x++) {
    if (parseInt(elements[x].close) < parseInt(elements[x - 1].close)) {
      loss += parseInt(elements[x - 1].close) - parseInt(elements[x].close);
    }
  }
  return loss;
}
