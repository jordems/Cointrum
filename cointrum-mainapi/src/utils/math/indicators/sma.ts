import ICandle from "../../markets/types/ICandle";

export function smaAlgo(
  windowSize: number,
  element: ICandle,
  phdselements: ICandle[]
): number {
  const startingIdx = phdselements.indexOf(element);

  try {
    const prevElements = phdselements.slice(
      startingIdx - windowSize,
      startingIdx
    );

    const allElements = [...prevElements, element];

    let sum = 0;
    for (const ele of allElements) {
      sum += parseFloat(ele.close);
    }

    return sum / windowSize;
  } catch (e) {
    return NaN;
  }
}
