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
    const EXPECTEDRESULTSSTART = [-1, -1];
    const EXPECTEDRESULTSEND = [1.0224958001779982, 0.939496093487598];

    const resultingElements = atr(lElements, []);

    // Get atr's for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(r.openTime, "\natr14: " + r.atr14 + ",\n");
    // }
    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualStartResults: number[] = [];
    for (const ele of checkingStartResults) {
      ele.atr14 && actualStartResults.push(ele.atr14);
    }

    let actualEndResults: number[] = [];
    for (const ele of checkingEndResults) {
      ele.atr14 && actualEndResults.push(ele.atr14);
    }

    expect(actualStartResults).toStrictEqual(EXPECTEDRESULTSSTART);
    expect(actualEndResults).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("ATR: /w lastknown", () => {
    const EXPECTEDRESULTSSTART = [0.5069200540436852, 0.4971959194055236];
    const EXPECTEDRESULTSEND = [1.0224958001779982, 0.939496093487598];

    const resultingElements = atr(qdata, ArrayICandleAdapter(lknown));

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualStartResults: number[] = [];
    for (const ele of checkingStartResults) {
      ele.atr14 && actualStartResults.push(ele.atr14);
    }

    let actualEndResults: number[] = [];
    for (const ele of checkingEndResults) {
      ele.atr14 && actualEndResults.push(ele.atr14);
    }

    expect(actualStartResults).toStrictEqual(EXPECTEDRESULTSSTART);
    expect(actualEndResults).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("BollingerBand: /wo lastknown", () => {
    const EXPECTEDRESULTSSTARTLOWER = [-1, -1];
    const EXPECTEDRESULTSSTARTMIDDLE = [-1, -1];
    const EXPECTEDRESULTSSTARTUPPER = [-1, -1];

    const EXPECTEDRESULTSENDLOWER = [57.759368854301194, 57.75255442206569];
    const EXPECTEDRESULTSENDMIDDLE = [59.52299159999999, 59.53183370000001];
    const EXPECTEDRESULTSENDUPPER = [61.28661434569879, 61.31111297793432];

    const resultingElements = bollingerband(lElements, []);

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsLowerStart: number[] = [];
    let actualResultsMiddleStart: number[] = [];
    let actualResultsUpperStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.BBlower && actualResultsLowerStart.push(ele.BBlower);
      ele.BBmiddle && actualResultsMiddleStart.push(ele.BBmiddle);
      ele.BBupper && actualResultsUpperStart.push(ele.BBupper);
    }

    expect(actualResultsLowerStart).toStrictEqual(EXPECTEDRESULTSSTARTLOWER);
    expect(actualResultsMiddleStart).toStrictEqual(EXPECTEDRESULTSSTARTMIDDLE);
    expect(actualResultsUpperStart).toStrictEqual(EXPECTEDRESULTSSTARTUPPER);

    let actualResultsLowerEnd: number[] = [];
    let actualResultsMiddleEnd: number[] = [];
    let actualResultsUpperEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.BBlower && actualResultsLowerEnd.push(ele.BBlower);
      ele.BBmiddle && actualResultsMiddleEnd.push(ele.BBmiddle);
      ele.BBupper && actualResultsUpperEnd.push(ele.BBupper);
    }

    expect(actualResultsLowerEnd).toStrictEqual(EXPECTEDRESULTSENDLOWER);
    expect(actualResultsMiddleEnd).toStrictEqual(EXPECTEDRESULTSENDMIDDLE);
    expect(actualResultsUpperEnd).toStrictEqual(EXPECTEDRESULTSENDUPPER);
  });

  test("BollingerBand: /w lastknown", () => {
    const EXPECTEDRESULTSSTARTLOWER = [22.369759807628274, 22.53950742695505];
    const EXPECTEDRESULTSSTARTMIDDLE = [23.928653249999993, 23.829952399999993];
    const EXPECTEDRESULTSSTARTUPPER = [25.487546692371712, 25.120397373044934];

    const EXPECTEDRESULTSENDLOWER = [57.759368854301194, 57.75255442206569];
    const EXPECTEDRESULTSENDMIDDLE = [59.52299159999999, 59.53183370000001];
    const EXPECTEDRESULTSENDUPPER = [61.28661434569879, 61.31111297793432];

    const resultingElements = bollingerband(qdata, ArrayICandleAdapter(lknown));

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsLowerStart: number[] = [];
    let actualResultsMiddleStart: number[] = [];
    let actualResultsUpperStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.BBlower && actualResultsLowerStart.push(ele.BBlower);
      ele.BBmiddle && actualResultsMiddleStart.push(ele.BBmiddle);
      ele.BBupper && actualResultsUpperStart.push(ele.BBupper);
    }

    expect(actualResultsLowerStart).toStrictEqual(EXPECTEDRESULTSSTARTLOWER);
    expect(actualResultsMiddleStart).toStrictEqual(EXPECTEDRESULTSSTARTMIDDLE);
    expect(actualResultsUpperStart).toStrictEqual(EXPECTEDRESULTSSTARTUPPER);

    let actualResultsLowerEnd: number[] = [];
    let actualResultsMiddleEnd: number[] = [];
    let actualResultsUpperEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.BBlower && actualResultsLowerEnd.push(ele.BBlower);
      ele.BBmiddle && actualResultsMiddleEnd.push(ele.BBmiddle);
      ele.BBupper && actualResultsUpperEnd.push(ele.BBupper);
    }

    expect(actualResultsLowerEnd).toStrictEqual(EXPECTEDRESULTSENDLOWER);
    expect(actualResultsMiddleEnd).toStrictEqual(EXPECTEDRESULTSENDMIDDLE);
    expect(actualResultsUpperEnd).toStrictEqual(EXPECTEDRESULTSENDUPPER);
  });

  test("EMA: /wo lastknown", () => {
    const EXPECTEDRESULTSEMA12START = [-1, -1];
    const EXPECTEDRESULTSEMA26START = [-1, -1];

    const EXPECTEDRESULTSEMA12END = [59.94476154689214, 60.0347980781395];
    const EXPECTEDRESULTSEMA26END = [59.32482846312225, 59.41410035474283];

    const resultingElements = ema(lElements, []);

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
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

    let actualResultsEMA12Start: number[] = [];
    let actualResultsEMA26Start: number[] = [];
    for (const ele of checkingStartResults) {
      ele.ema12 && actualResultsEMA12Start.push(ele.ema12);
      ele.ema26 && actualResultsEMA26Start.push(ele.ema26);
    }

    expect(actualResultsEMA12Start).toStrictEqual(EXPECTEDRESULTSEMA12START);
    expect(actualResultsEMA26Start).toStrictEqual(EXPECTEDRESULTSEMA26START);

    let actualResultsEMA12End: number[] = [];
    let actualResultsEMA26End: number[] = [];
    for (const ele of checkingEndResults) {
      ele.ema12 && actualResultsEMA12End.push(ele.ema12);
      ele.ema26 && actualResultsEMA26End.push(ele.ema26);
    }

    expect(actualResultsEMA12End).toStrictEqual(EXPECTEDRESULTSEMA12END);
    expect(actualResultsEMA26End).toStrictEqual(EXPECTEDRESULTSEMA26END);
  });

  test("EMA: /w lastknown", () => {
    const EXPECTEDRESULTSEMA12START = [23.60726653036974, 23.695094756466702];
    const EXPECTEDRESULTSEMA26START = [24.244243837338797, 24.239347997535923];

    const EXPECTEDRESULTSEMA12END = [59.94476154689214, 60.0347980781395];
    const EXPECTEDRESULTSEMA26END = [59.32482846312225, 59.41410035474283];
    const resultingElements = ema(qdata, ArrayICandleAdapter(lknown));

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
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

    let actualResultsEMA12Start: number[] = [];
    let actualResultsEMA26Start: number[] = [];
    for (const ele of checkingStartResults) {
      ele.ema12 && actualResultsEMA12Start.push(ele.ema12);
      ele.ema26 && actualResultsEMA26Start.push(ele.ema26);
    }

    expect(actualResultsEMA12Start).toStrictEqual(EXPECTEDRESULTSEMA12START);
    expect(actualResultsEMA26Start).toStrictEqual(EXPECTEDRESULTSEMA26START);

    let actualResultsEMA12End: number[] = [];
    let actualResultsEMA26End: number[] = [];
    for (const ele of checkingEndResults) {
      ele.ema12 && actualResultsEMA12End.push(ele.ema12);
      ele.ema26 && actualResultsEMA26End.push(ele.ema26);
    }

    expect(actualResultsEMA12End).toStrictEqual(EXPECTEDRESULTSEMA12END);
    expect(actualResultsEMA26End).toStrictEqual(EXPECTEDRESULTSEMA26END);
  });

  test("ElderRay: /wo lastknown", () => {
    const EXPECTEDRESULTSSTART = [
      [-1, -1],
      [-1, -1],
    ];
    const EXPECTEDRESULTSEND = [
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

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsStart: [number, number][] = [];
    for (const ele of checkingStartResults) {
      ele.ElderRay && actualResultsStart.push(ele.ElderRay);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: [number, number][] = [];
    for (const ele of checkingEndResults) {
      ele.ElderRay && actualResultsEnd.push(ele.ElderRay);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("ElderRay: /w lastknown", () => {
    const EXPECTEDRESULTSSTART = [
      [0.27259808206195046, 0.030567036626660382],
      [0.5126493924192097, 0.07866034816173695],
    ];
    const EXPECTEDRESULTSEND = [
      [1.2090228660085316, 0.35902486600853223],
      [0.5477347422930237, 0.14773674229302713],
    ];

    const resultingElements = elderray(qdata, ArrayICandleAdapter(lknown));

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsStart: [number, number][] = [];
    for (const ele of checkingStartResults) {
      ele.ElderRay && actualResultsStart.push(ele.ElderRay);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: [number, number][] = [];
    for (const ele of checkingEndResults) {
      ele.ElderRay && actualResultsEnd.push(ele.ElderRay);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("Force Index: /wo lastknown", () => {
    const EXPECTEDRESULTSSTART = [-1, -1];
    const EXPECTEDRESULTSEND = [1697836.648590974, 1610737.1114351158];

    const resultingElements = forceindex(lElements, []);

    // Get f13's for /wlastknown test
    // for (const lk of lknown.reverse()) {
    //   const r = resultingElements.filter(
    //     (ele) => ele.openTime === lk.openTime
    //   )[0];
    //   console.log(r.openTime, "\nforceindex13: " + r.forceindex13 + ",\n");
    // }

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.forceindex13 && actualResultsStart.push(ele.forceindex13);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.forceindex13 && actualResultsEnd.push(ele.forceindex13);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("Force Index: /w lastknown", () => {
    const EXPECTEDRESULTSSTART = [-1815854.3641402952, 385228.3582368896];
    const EXPECTEDRESULTSEND = [1697836.648590974, 1610737.1114351158];

    const resultingElements = forceindex(qdata, ArrayICandleAdapter(lknown));

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.forceindex13 && actualResultsStart.push(ele.forceindex13);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.forceindex13 && actualResultsEnd.push(ele.forceindex13);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
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
    const EXPECTEDRESULTSSTART = [-1, -1];
    const EXPECTEDRESULTSEND = [57.382247207037715, 58.104745849400366];

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

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.RSI14 && actualResultsStart.push(ele.RSI14);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.RSI14 && actualResultsEnd.push(ele.RSI14);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("RSI: /w lastknown", () => {
    const EXPECTEDRESULTSSTART = [45.83756412420888, 50.52104751106972];
    const EXPECTEDRESULTSEND = [57.382247207037715, 58.104745849400366];

    const resultingElements = rsi(qdata, ArrayICandleAdapter(lknown));

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.RSI14 && actualResultsStart.push(ele.RSI14);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.RSI14 && actualResultsEnd.push(ele.RSI14);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("SAR: /wo lastknown", () => {
    const EXPECTEDRESULTSSTART = [-1, 25.83502196495549];
    const EXPECTEDRESULTSEND = [57.47029081503744, 57.69767324613519];

    const resultingElements = sar(lElements, []);

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
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

    let actualResultsStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.PSAR && actualResultsStart.push(ele.PSAR);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.PSAR && actualResultsEnd.push(ele.PSAR);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
  });

  test("SAR: /w lastknown", () => {
    const EXPECTEDRESULTSSTART = [24.011176633919604, 22.90262235438972];
    const EXPECTEDRESULTSEND = [57.47029081503744, 57.69767324613519];

    const resultingElements = sar(qdata, ArrayICandleAdapter(lknown));

    const checkingStartResults = resultingElements.slice(0, 2);
    const checkingEndResults = resultingElements.slice(
      resultingElements.length - 2
    );

    let actualResultsStart: number[] = [];
    for (const ele of checkingStartResults) {
      ele.PSAR && actualResultsStart.push(ele.PSAR);
    }

    expect(actualResultsStart).toStrictEqual(EXPECTEDRESULTSSTART);

    let actualResultsEnd: number[] = [];
    for (const ele of checkingEndResults) {
      ele.PSAR && actualResultsEnd.push(ele.PSAR);
    }

    expect(actualResultsEnd).toStrictEqual(EXPECTEDRESULTSEND);
  });
});
