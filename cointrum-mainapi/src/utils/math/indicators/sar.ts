import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const sar: IBaseIndicator = (candles, lastknownDocument) => {
  console.log(phdselements.length, extraelements.length);
  for (const ele of phdselements) {
    ele.SAR00202 = sarAlgo(ele, extraelements);
  }

  return phdselements;
};

export function sarAlgo(element: ICandle, phdselements: ICandle[]): number {
  const startingIdx = phdselements.indexOf(element);

  const prevElements = phdselements.slice(startingIdx - 5, startingIdx);
  const allElements = [...prevElements, element];
  // initial PSAR
  let prevAF: number = 0.02;
  let prevEP: number = parseFloat(allElements[1].low);
  let prevSAR: number = parseFloat(allElements[1].high);
  let prevState: "Climbing" | "Falling" = "Falling";
  let prevDiv: number = (prevSAR - prevEP) * prevAF;

  let AF: number = 0;
  let EP: number = 0;
  let SAR: number = 0;
  let initialSAR: number = 0;
  let State: "Climbing" | "Falling" = "Falling";
  let Div: number = 0;

  for (let x = 2; x < allElements.length; x++) {
    // remaining psars
    if (prevState === "Falling") {
      initialSAR = Math.max(
        prevSAR - prevDiv,
        parseFloat(allElements[x - 1].high),
        parseFloat(allElements[x - 2].high)
      );
    } else {
      initialSAR = Math.min(
        prevSAR - prevDiv,
        parseFloat(allElements[x - 1].low),
        parseFloat(allElements[x - 2].low)
      );
    }

    // Calculate new SAR
    if (prevState === "Falling") {
      if (parseFloat(allElements[x].high) < initialSAR) {
        SAR = initialSAR;
      } else {
        SAR = prevEP;
      }
    } else {
      if (parseFloat(allElements[x].low) > initialSAR) {
        SAR = initialSAR;
      } else {
        SAR = prevEP;
      }
    }

    // Calculate new State
    if (SAR > parseFloat(allElements[x].close)) {
      State = "Falling";
    } else {
      State = "Climbing";
    }

    // Calculate new EP
    if (prevState === "Falling") {
      EP = Math.min(prevEP, parseFloat(allElements[x].low));
    } else {
      EP = Math.max(prevEP, parseFloat(allElements[x].high));
    }

    // Calculate new AF
    if (State === prevState && EP !== prevEP && prevAF < 0.2) {
      AF = prevAF + 0.02;
    } else if (State === prevState && EP === prevEP) {
      AF = prevAF;
    } else if (State !== prevState) {
      AF = 0.02;
    } else {
      AF = 0.2;
    }

    // Calculate new Div
    Div = (SAR - EP) * AF;

    //Assign previous values
    prevAF = AF;
    prevEP = EP;
    prevSAR = SAR;
    prevState = State;
    prevDiv = Div;
  }

  return SAR;
}
