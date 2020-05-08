import {
  atr,
  bollingerband,
  ema,
  elderray,
  forceindex,
  macd,
  rsi,
  sar,
} from "./";
import ICandle, { ArrayICandleAdapter } from "../../markets/types/ICandle";

import { libElements, lastknown, queryeddata } from "./TestData";
import { IPHDSElement } from "../../../models/PHDSElement";

// ALL Actual Values to test against found in Google Sheets:
// https://docs.google.com/spreadsheets/d/1uOZKE8aMg_jS7RsyANXeGL0mk7ft4A745tBosowzT-w/edit?usp=sharing

describe("Indicator Calculation Tests:", () => {
  let lElements: ICandle[] = libElements,
    lknown: IPHDSElement[] = lastknown,
    qdata: ICandle[] = queryeddata;

  test("ATR: /wo lastknown", () => {
    const EXPECTEDRESULTS = [1.0224958001779982, 0.939496093487598];

    const resultingElements = atr(lElements, []);

    // Get atr's for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(r.openTime, "\natr14: " + r.atr14 + ",\n");
    // }

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.atr14 && actualResults.push(ele.atr14);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("ATR: /w lastknown", () => {
    const EXPECTEDRESULTS = [1.0224958001779982, 0.939496093487598];

    const resultingElements = atr(qdata, ArrayICandleAdapter(lknown));

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.atr14 && actualResults.push(ele.atr14);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("BollingerBand: /wo lastknown", () => {
    const EXPECTEDRESULTSLOWER = [57.759368854301194, 57.75255442206569];
    const EXPECTEDRESULTSMIDDLE = [59.52299159999999, 59.53183370000001];
    const EXPECTEDRESULTSUPPER = [61.28661434569879, 61.31111297793432];

    const resultingElements = bollingerband(lElements, []);

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

  test("BollingerBand: /w lastknown", () => {
    const EXPECTEDRESULTSLOWER = [57.759368854301194, 57.75255442206569];
    const EXPECTEDRESULTSMIDDLE = [59.52299159999999, 59.53183370000001];
    const EXPECTEDRESULTSUPPER = [61.28661434569879, 61.31111297793432];

    const resultingElements = bollingerband(qdata, ArrayICandleAdapter(lknown));

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

  test("EMA: /wo lastknown", () => {
    const EXPECTEDRESULTSEMA12 = [59.94476154689214, 60.0347980781395];
    const EXPECTEDRESULTSEMA26 = [59.32482846312225, 59.41410035474283];

    const resultingElements = ema(lElements, []);

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    // Get ema's for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(
    //     r.openTime,
    //     "\nema12: " + r.ema12 + ",\n",
    //     "ema26:" + r.ema26
    //   );
    // }

    let actualResultsEMA12: number[] = [];
    let actualResultsEMA26: number[] = [];
    for (const ele of checkingResults) {
      ele.ema12 && actualResultsEMA12.push(ele.ema12);
      ele.ema26 && actualResultsEMA26.push(ele.ema26);
    }

    expect(actualResultsEMA12).toStrictEqual(EXPECTEDRESULTSEMA12);
    expect(actualResultsEMA26).toStrictEqual(EXPECTEDRESULTSEMA26);
  });

  test("EMA: /w lastknown", () => {
    const EXPECTEDRESULTSEMA12 = [59.94476154689214, 60.0347980781395];
    const EXPECTEDRESULTSEMA26 = [59.32482846312225, 59.41410035474283];

    const resultingElements = ema(qdata, ArrayICandleAdapter(lknown));

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResultsEMA12: number[] = [];
    let actualResultsEMA26: number[] = [];
    for (const ele of checkingResults) {
      ele.ema12 && actualResultsEMA12.push(ele.ema12);
      ele.ema26 && actualResultsEMA26.push(ele.ema26);
    }

    expect(actualResultsEMA12).toStrictEqual(EXPECTEDRESULTSEMA12);
    expect(actualResultsEMA26).toStrictEqual(EXPECTEDRESULTSEMA26);
  });

  test("ElderRay: /wo lastknown", () => {
    const EXPECTEDRESULTS = [
      [1.2090228660085316, 0.35902486600853223],
      [0.5477347422930237, 0.14773674229302713],
    ];

    const resultingElements = elderray(lElements, []);

    // Get ema's for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(r.openTime, "\nema13: " + r.ema13 + ",\n");
    // }

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: [number, number][] = [];
    for (const ele of checkingResults) {
      ele.ElderRay && actualResults.push(ele.ElderRay);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("ElderRay: /w lastknown", () => {
    const EXPECTEDRESULTS = [
      [1.2090228660085316, 0.35902486600853223],
      [0.5477347422930237, 0.14773674229302713],
    ];

    const resultingElements = elderray(qdata, ArrayICandleAdapter(lknown));

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: [number, number][] = [];
    for (const ele of checkingResults) {
      ele.ElderRay && actualResults.push(ele.ElderRay);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("Force Index: /wo lastknown", () => {
    const EXPECTEDRESULTS = [1697836.648590974, 1610737.1114351158];

    const resultingElements = forceindex(lElements, []);

    // Get f13's for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(r.openTime, "\nforceindex13: " + r.forceindex13 + ",\n");
    // }

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.forceindex13 && actualResults.push(ele.forceindex13);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("Force Index: /w lastknown", () => {
    const EXPECTEDRESULTS = [1697836.648590974, 1610737.1114351158];

    const resultingElements = forceindex(qdata, ArrayICandleAdapter(lknown));

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.forceindex13 && actualResults.push(ele.forceindex13);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("MACD: /wo lastknown", () => {
    const EXPECTEDRESULTS = [0.6199330837698867, 0.620697723396674];

    const resultingElements = macd(lElements, []);

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.MACD && actualResults.push(ele.MACD);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("MACD: /w lastknown", () => {
    const EXPECTEDRESULTS = [0.6199330837698867, 0.620697723396674];

    const resultingElements = macd(qdata, ArrayICandleAdapter(lknown));

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.MACD && actualResults.push(ele.MACD);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("RSI: /wo lastknown", () => {
    const EXPECTEDRESULTS = [57.382247207037715, 58.104745849400366];

    const resultingElements = rsi(lElements, []);

    // Get RSI's GAIN/LOSS for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(
    //     r.openTime,
    //     "\nRSIGAIN: " + r.RSIGAIN + ",\nRSILOSS: " + r.RSILOSS
    //   );
    // }

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.RSI14 && actualResults.push(ele.RSI14);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("RSI: /w lastknown", () => {
    const EXPECTEDRESULTS = [57.382247207037715, 58.104745849400366];

    const resultingElements = rsi(qdata, ArrayICandleAdapter(lknown));

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.RSI14 && actualResults.push(ele.RSI14);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("SAR: /wo lastknown", () => {
    const EXPECTEDRESULTS = [57.47029081503744, 57.69767324613519];

    const resultingElements = sar(lElements, []);

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    // Get SAR's Info for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(
    //     r.openTime,
    //     "\nPSAR: " +
    //       r.PSAR +
    //       ",\nPSAR_ACC: " +
    //       r.PSAR_ACC +
    //       ",\nPSAR_EP: " +
    //       r.PSAR_EP +
    //       ",\nPSAR_INIT: " +
    //       r.PSAR_INIT +
    //       ',\nPSAR_TREND: "' +
    //       r.PSAR_TREND +
    //       '"'
    //   );
    // }

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.PSAR && actualResults.push(ele.PSAR);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });

  test("SAR: /w lastknown", () => {
    const EXPECTEDRESULTS = [57.47029081503744, 57.69767324613519];

    const resultingElements = sar(qdata, ArrayICandleAdapter(lknown));

    const checkingResults = resultingElements.splice(
      resultingElements.length - 2
    );

    let actualResults: number[] = [];
    for (const ele of checkingResults) {
      ele.PSAR && actualResults.push(ele.PSAR);
    }

    expect(actualResults).toStrictEqual(EXPECTEDRESULTS);
  });
});
