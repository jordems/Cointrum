import { IBaseIndicator } from "./IBaseIndicator";
import ICandle from "../../markets/types/ICandle";

export const sar: IBaseIndicator = (phdselements, extraelements) => {
  for (const ele of phdselements) {
    ele.SAR00202 = sarAlgo(ele, extraelements);
  }

  return phdselements;
};

export function sarAlgo(element: ICandle, phdselements: ICandle[]): number {
  let startingIdx = -1;

  for (let x = 0; x < phdselements.length; x++) {
    if (phdselements[x].open === element.open) {
      startingIdx = x;
    }
  }
  console.log("Startingidx", startingIdx);

  const prevElements = phdselements.splice(startingIdx - 5, startingIdx);
  const allElements = [...prevElements, element];
  console.log(prevElements);
  // initial PSAR
  let prevAF: number = 0.02;
  let prevEP: number = parseInt(allElements[1].low);
  let prevSAR: number = parseInt(allElements[1].high);
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
        parseInt(allElements[x - 1].high),
        parseInt(allElements[x - 2].high)
      );
    } else {
      initialSAR = Math.min(
        prevSAR - prevDiv,
        parseInt(allElements[x - 1].low),
        parseInt(allElements[x - 2].low)
      );
    }

    // Calculate new SAR
    if (prevState === "Falling") {
      if (parseInt(allElements[x].high) < initialSAR) {
        SAR = initialSAR;
      } else {
        SAR = prevEP;
      }
    } else {
      if (parseInt(allElements[x].low) > initialSAR) {
        SAR = initialSAR;
      } else {
        SAR = prevEP;
      }
    }

    // Calculate new State
    if (SAR > parseInt(allElements[x].close)) {
      State = "Falling";
    } else {
      State = "Climbing";
    }

    // Calculate new EP
    if (prevState === "Falling") {
      EP = Math.min(prevEP, parseInt(allElements[x].low));
    } else {
      EP = Math.max(prevEP, parseInt(allElements[x].high));
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
