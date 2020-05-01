import ICandle from "../../markets/types/ICandle";

export function smaAlgo(
  windowSize: number,
  element: ICandle,
  phdselements: ICandle[]
): number {
  const startingIdx = phdselements.findIndex(
    (ele) => ele.openTime === element.openTime
  );

  try {
    const prevElements = phdselements.splice(
      startingIdx - windowSize,
      startingIdx
    );

    const allElements = [...prevElements, element];

    let sum = 0;
    for (const ele of allElements) {
      sum += parseInt(ele.close);
    }

    return sum / windowSize;
  } catch (e) {
    return NaN;
  }
}
