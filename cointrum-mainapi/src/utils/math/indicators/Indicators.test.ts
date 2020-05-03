import {
  atr,
  bollingerband,
  // elderray,
  // ema,
  // forceindex,
  // macd,
  // rsi,
  // sar,
} from "./";
import ICandle from "../../markets/types/ICandle";

import { libElements } from "./TestData";

describe("Indicator Calculation Tests:", () => {
  let tElements: ICandle[], lElements: ICandle[];

  beforeEach(() => {
    lElements = libElements;
  });

  test("ATR:", () => {
    const EXPECTEDRESULTS = [1.0224958001779982, 0.939496093487598];

    const resultingElements = atr(lElements);

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.atr14 && actualResults.push(ele.atr14);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("BollingerBand:", () => {
    const EXPECTEDRESULTSLOWER = [57.759368854301194, 57.75255442206569];
    const EXPECTEDRESULTSMIDDLE = [59.52299159999999, 59.53183370000001];
    const EXPECTEDRESULTSUPPER = [61.28661434569879, 61.31111297793432];

    const resultingElements = bollingerband(lElements);

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResultsLower: number[] = [];
    let actualResultsMiddle: number[] = [];
    let actualResultsUpper: number[] = [];
    for (const ele of checkingResults) {
      ele.BBlower && actualResultsLower.push(ele.BBlower);
      ele.BBmiddle && actualResultsMiddle.push(ele.BBmiddle);
      ele.BBupper && actualResultsUpper.push(ele.BBupper);
    }

    expect(actualResultsLower).toStrictEqual(EXPECTEDRESULTSLOWER);
    expect(actualResultsMiddle).toStrictEqual(EXPECTEDRESULTSMIDDLE);
    expect(actualResultsUpper).toStrictEqual(EXPECTEDRESULTSUPPER);
  });

  // test("ElderRay:", () => {
  //   const EXPECTEDRESULTS = [
  //     [1.38, 0.53],
  //     [0.77, 0.37],
  //   ];

  //   const resultingElements = elderray(tElements, lElements);

  //   let actualResults: [number, number][] = [];
  //   for (const ele of resultingElements) {
  //     ele.ElderRay && actualResults.push(ele.ElderRay);
  //   }

  //   expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  // });

  // test("EMA:", () => {
  //   const EXPECTEDRESULTSEMA12 = [59.94, 60.03];
  //   const EXPECTEDRESULTSEMA26 = [59.32, 59.41];

  //   const resultingElements = ema(tElements, lElements);

  //   let actualResultsEMA12: number[] = [];
  //   let actualResultsEMA26: number[] = [];
  //   for (const ele of resultingElements) {
  //     ele.ema12 && actualResultsEMA12.push(ele.ema12);
  //     ele.ema26 && actualResultsEMA26.push(ele.ema26);
  //   }

  //   expect(actualResultsEMA12).toStrictEqual(EXPECTEDRESULTSEMA12);
  //   expect(actualResultsEMA26).toStrictEqual(EXPECTEDRESULTSEMA26);
  // });

  // test("Force Index:", () => {
  //   const EXPECTEDRESULTS = [0.000001698, 0.000001611];

  //   const resultingElements = forceindex(tElements, lElements);

  //   let actualResults: number[] = [];
  //   for (const ele of resultingElements) {
  //     ele.forceindex13 && actualResults.push(ele.forceindex13);
  //   }

  //   expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  // });

  // test("MACD:", () => {
  //   const EXPECTEDRESULTS = [0.11, 0.09];

  //   const resultingElements = macd(tElements, lElements);

  //   let actualResults: number[] = [];
  //   for (const ele of resultingElements) {
  //     ele.MACD && actualResults.push(ele.MACD);
  //   }

  //   expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  // });

  // test("RSI:", () => {
  //   const EXPECTEDRESULTS = [57.38, 58.1];

  //   const resultingElements = rsi(tElements, lElements);

  //   let actualResults: number[] = [];
  //   for (const ele of resultingElements) {
  //     ele.RSI14 && actualResults.push(ele.RSI14);
  //   }

  //   expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  // });

  // test("SAR:", () => {
  //   const EXPECTEDRESULTS = [57.69, 58.05];

  //   const resultingElements = sar(tElements, lElements);

  //   let actualResults: number[] = [];
  //   for (const ele of resultingElements) {
  //     ele.SAR00202 && actualResults.push(ele.SAR00202);
  //   }

  //   expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  // });
});
