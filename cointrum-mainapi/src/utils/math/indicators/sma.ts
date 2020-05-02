import ICandle from "../../markets/types/ICandle";

export function smaAlgo(
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

    let sum = 0;
    for (const ele of allElements) {
      sum += parseFloat(ele.close);
    }

    return sum / windowSize;
  } catch (e) {
    return NaN;
  }
}
