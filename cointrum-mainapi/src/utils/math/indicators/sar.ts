import { IBaseIndicator } from "./IBaseIndicator";
import ICandle, { ICandleAdapter } from "../../markets/types/ICandle";
import { IPHDSElement } from "../../../models/PHDSElement";

export const sar: IBaseIndicator = (candles, lastknownDocuments) => {
  let results = [...candles];

  results = sarAlgo(candles, lastknownDocuments);

  return results;
};

export function sarAlgo(
  candles: ICandle[],
  lastknownDocuments?: IPHDSElement[]
): ICandle[] {
  // Convert lastknownDocuments to type ICandle
  let lastknownCandles: ICandle[] = [];
  if (lastknownDocuments) {
    for (const phdselement of lastknownDocuments) {
      lastknownCandles.push(ICandleAdapter(phdselement));
    }
  }
  let results = [...candles];

  if (lastknownCandles.length === 0) {
    results[0].PSAR_EP = NaN;
    results[0].PSAR_ACC = NaN;
    results[0].PSAR_INIT = NaN;
    results[0].PSAR_TREND = "Falling";
    results[0].PSAR = NaN;

    // initial PSAR
    let prevAF: number = 0.02;
    let prevEP: number = parseFloat(results[1].low);
    let prevSAR: number = parseFloat(results[1].high);
    let prevState: "Rising" | "Falling" = "Falling";
    let prevDif: number = (prevSAR - prevEP) * prevAF;
    results[1].PSAR_EP = prevEP;
    results[1].PSAR_ACC = prevAF;
    results[1].PSAR_INIT = NaN;
    results[1].PSAR_TREND = prevState;
    results[1].PSAR = prevSAR;

    let AF: number = 0;
    let EP: number = 0;
    let SAR: number = 0;
    let initialSAR: number = 0;
    let State: "Rising" | "Falling" = "Falling";
    let Dif: number = 0;

    for (let x = 2; x < results.length; x++) {
      // remaining psars
      if (prevState === "Falling") {
        initialSAR = Math.max(
          prevSAR - prevDif,
          parseFloat(results[x - 1].high),
          parseFloat(results[x - 2].high)
        );
      } else {
        initialSAR = Math.min(
          prevSAR - prevDif,
          parseFloat(results[x - 1].low),
          parseFloat(results[x - 2].low)
        );
      }

      // Calculate new SAR
      if (prevState === "Falling") {
        if (parseFloat(results[x].high) < initialSAR) {
          SAR = initialSAR;
        } else {
          SAR = prevEP;
        }
      } else {
        if (parseFloat(results[x].low) > initialSAR) {
          SAR = initialSAR;
        } else {
          SAR = prevEP;
        }
      }

      // Calculate new State
      if (SAR > parseFloat(results[x].close)) {
        State = "Falling";
      } else {
        State = "Rising";
      }

      // Calculate new EP
      if (prevState === "Falling") {
        EP = Math.min(prevEP, parseFloat(results[x].low));
      } else {
        EP = Math.max(prevEP, parseFloat(results[x].high));
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
      Dif = (SAR - EP) * AF;

      //Assign to results
      results[x].PSAR_EP = EP;
      results[x].PSAR_ACC = AF;
      results[x].PSAR_INIT = initialSAR;
      results[x].PSAR_TREND = State;
      results[x].PSAR = SAR;

      //Assign previous values
      prevAF = AF;
      prevEP = EP;
      prevSAR = SAR;
      prevState = State;
      prevDif = Dif;
    }

    return results;
  } else {
    // initial PSAR
    let prevAF = lastknownCandles[0].PSAR_ACC;

    let prevEP = lastknownCandles[0].PSAR_EP;
    let prevSAR = lastknownCandles[0].PSAR_ACC;

    let prevState = lastknownCandles[0].PSAR_TREND;

    // If prev value doesn't have information, assume last documents are badinput
    if (
      prevAF === undefined ||
      prevEP === undefined ||
      prevSAR === undefined ||
      prevState === undefined
    ) {
      return sarAlgo(candles);
    }

    let prevDif = (prevSAR - prevEP) * prevAF;

    let AF: number = 0;
    let EP: number = 0;
    let SAR: number = 0;
    let initialSAR: number = 0;
    let State: "Rising" | "Falling" = "Falling";
    let Dif: number = 0;

    const fulllist = [lastknownCandles[1], lastknownCandles[0], ...candles];

    for (let x = 2; x < fulllist.length; x++) {
      // remaining psars
      if (prevState === "Falling") {
        initialSAR = Math.max(
          prevSAR - prevDif,
          parseFloat(fulllist[x - 1].high),
          parseFloat(fulllist[x - 2].high)
        );
      } else {
        initialSAR = Math.min(
          prevSAR - prevDif,
          parseFloat(fulllist[x - 1].low),
          parseFloat(fulllist[x - 2].low)
        );
      }

      // Calculate new SAR
      if (prevState === "Falling") {
        if (parseFloat(fulllist[x].high) < initialSAR) {
          SAR = initialSAR;
        } else {
          SAR = prevEP;
        }
      } else {
        if (parseFloat(fulllist[x].low) > initialSAR) {
          SAR = initialSAR;
        } else {
          SAR = prevEP;
        }
      }

      // Calculate new State
      if (SAR > parseFloat(fulllist[x].close)) {
        State = "Falling";
      } else {
        State = "Rising";
      }

      // Calculate new EP
      if (prevState === "Falling") {
        EP = Math.min(prevEP, parseFloat(fulllist[x].low));
      } else {
        EP = Math.max(prevEP, parseFloat(fulllist[x].high));
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
      Dif = (SAR - EP) * AF;

      //Assign to results
      results[x - 2].PSAR_EP = EP;
      results[x - 2].PSAR_ACC = AF;
      results[x - 2].PSAR_INIT = initialSAR;
      results[x - 2].PSAR_TREND = State;
      results[x - 2].PSAR = SAR;

      //Assign previous values
      prevAF = AF;
      prevEP = EP;
      prevSAR = SAR;
      prevState = State;
      prevDif = Dif;
    }

    return results;
  }
}
