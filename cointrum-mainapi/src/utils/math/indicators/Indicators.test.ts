import {
  atr,
  bollingerband,
  elderray,
  ema,
  forceindex,
  macd,
  rsi,
  sar,
} from "./";
import ICandle from "../../markets/types/ICandle";

import { testElements, libElements } from "./TestData";

describe("Indicator Calculation Tests:", () => {
  let tElements: ICandle[], lElements: ICandle[];

  beforeEach(() => {
    tElements = testElements;

    lElements = libElements;
  });

  test("ATR:", () => {
    const EXPECTEDRESULTS = [1.02, 0.98];

    const resultingElements = atr(tElements, lElements);

    let actualResults: number[] = [];
    for (const ele of resultingElements) {
      ele.atr14 && actualResults.push(ele.atr14);
    }

    expect(actualResults).toBe(EXPECTEDRESULTS);
  });

  test("BollingerBand:", () => {
    const EXPECTEDRESULTSLOWER = [57.71, 57.69];
    const EXPECTEDRESULTSMIDDLE = [59.53, 59.57];
    const EXPECTEDRESULTSUPPER = [61.36, 61.45];

    const resultingElements = bollingerband(tElements, lElements);

    let actualResultsLower: number[] = [];
    let actualResultsMiddle: number[] = [];
    let actualResultsUpper: number[] = [];
    for (const ele of resultingElements) {
      ele.BBlower && actualResultsLower.push(ele.BBlower);
      ele.BBmiddle && actualResultsMiddle.push(ele.BBmiddle);
      ele.BBupper && actualResultsUpper.push(ele.BBupper);
    }

    expect(actualResultsLower).toBe(EXPECTEDRESULTSLOWER);
    expect(actualResultsMiddle).toBe(EXPECTEDRESULTSMIDDLE);
    expect(actualResultsUpper).toBe(EXPECTEDRESULTSUPPER);
  });

  test("ElderRay:", () => {
    const EXPECTEDRESULTS = [
      [1.38, 0.53],
      [0.77, 0.37],
    ];

    const resultingElements = elderray(tElements, lElements);

    let actualResults: [number, number][] = [];
    for (const ele of resultingElements) {
      ele.ElderRay && actualResults.push(ele.ElderRay);
    }

    expect(actualResults).toBe(EXPECTEDRESULTS);
  });

  test("EMA:", () => {
    const EXPECTEDRESULTSEMA12 = [59.94, 60.03];
    const EXPECTEDRESULTSEMA26 = [59.32, 59.41];

    const resultingElements = ema(tElements, lElements);

    let actualResultsEMA12: number[] = [];
    let actualResultsEMA26: number[] = [];
    for (const ele of resultingElements) {
      ele.ema12 && actualResultsEMA12.push(ele.ema12);
      ele.ema26 && actualResultsEMA26.push(ele.ema26);
    }

    expect(actualResultsEMA12).toBe(EXPECTEDRESULTSEMA12);
    expect(actualResultsEMA26).toBe(EXPECTEDRESULTSEMA26);
  });

  test("Force Index:", () => {
    const EXPECTEDRESULTS = [0.000001698, 0.000001611];

    const resultingElements = forceindex(tElements, lElements);

    let actualResults: number[] = [];
    for (const ele of resultingElements) {
      ele.forceindex13 && actualResults.push(ele.forceindex13);
    }

    expect(actualResults).toBe(EXPECTEDRESULTS);
  });

  test("MACD:", () => {
    const EXPECTEDRESULTS = [0.11, 0.09];

    const resultingElements = macd(tElements, lElements);

    let actualResults: number[] = [];
    for (const ele of resultingElements) {
      ele.MACD && actualResults.push(ele.MACD);
    }

    expect(actualResults).toBe(EXPECTEDRESULTS);
  });

  test("RSI:", () => {
    const EXPECTEDRESULTS = [57.38, 58.1];

    const resultingElements = rsi(tElements, lElements);

    let actualResults: number[] = [];
    for (const ele of resultingElements) {
      ele.RSI14 && actualResults.push(ele.RSI14);
    }

    expect(actualResults).toBe(EXPECTEDRESULTS);
  });

  test("SAR:", () => {
    const EXPECTEDRESULTS = [57.69, 58.05];

    const resultingElements = sar(tElements, lElements);

    let actualResults: number[] = [];
    for (const ele of resultingElements) {
      ele.SAR00202 && actualResults.push(ele.SAR00202);
    }

    expect(actualResults).toBe(EXPECTEDRESULTS);
  });
});
