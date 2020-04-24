import { connectDB } from "./../../utils/Database";
import PHDSController from "./PHDSController";
import { IPHDSElement } from "../../models/PHDSElement";
import subtractTime from "../../utils/math/TimeSubtractor";

// describe("PHDSController: getCandleSticks()", () => {
//   let phdsController: PHDSController;

//   beforeAll(async (done) => {
//     await connectDB();
//     done();
//   });

//   describe("without start and end ", () => {
//     test("wo/dbfilled", async (done) => {
//       phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

//       const candleSticks = await phdsController.getCandleSticks();

//       expect(candleSticks.length).toBe(1);
//       done();
//     }, 30000);
//     test("w/dbfilled", async (done) => {
//       phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

//       const candleSticks = await phdsController.getCandleSticks();

//       expect(candleSticks.length).toBe(1);
//       done();
//     }, 30000);
//   });

//   describe("with start without end", () => {
//     test("wo/dbfilled", async (done) => {
//       done();
//     });
//     test("w/dbfilled", async (done) => {
//       done();
//     });
//   });

//   describe("with start and end", () => {
//     test("wo/dbfilled", async (done) => {
//       done();
//     });
//     test("w/dbfilled", async (done) => {
//       done();
//     });
//   });
// });

describe("PHDSController: findMissingZones()", () => {
  let phdsController: PHDSController;

  test("no missing zones", () => {
    phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

    const currentTime = 1587645900000; // in UTC milliseconds

    let startTime = subtractTime(currentTime, "1m");

    const testElements: IPHDSElement[] = [
      {
        openTime: 1587645780000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645839999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
      {
        openTime: 1587645840000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645899999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
    ];

    const missingZones = phdsController.findMissingZones(
      testElements,
      currentTime,
      startTime
    );

    expect(missingZones.length).toBe(0);
  });

  test("all missing zone", () => {
    phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

    const currentTime = 1587645900000; // in UTC milliseconds

    let startTime = subtractTime(currentTime, "1m");

    const testElements: IPHDSElement[] = [];

    const missingZones = phdsController.findMissingZones(
      testElements,
      currentTime,
      startTime
    );

    expect(missingZones.length).toBe(1);
  });

  test("missing zone at start", () => {
    phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

    const currentTime = 1587645900000; // in UTC milliseconds

    let startTime = subtractTime(currentTime, "5m");

    const testElements: IPHDSElement[] = [
      {
        openTime: 1587645780000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645839999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
      {
        openTime: 1587645840000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645899999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
    ];

    const missingZones = phdsController.findMissingZones(
      testElements,
      currentTime,
      startTime
    );

    expect(missingZones.length).toBe(1);
  });

  test("missing zone at middle", () => {
    phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

    const currentTime = 1587645900000; // in UTC milliseconds

    let startTime = subtractTime(currentTime, "3m");

    const testElements: IPHDSElement[] = [
      {
        openTime: 1587645720000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645779999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
      {
        openTime: 1587645840000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645899999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
    ];

    const missingZones = phdsController.findMissingZones(
      testElements,
      currentTime,
      startTime
    );

    expect(missingZones.length).toBe(1);
  });

  test("missing zone at end", () => {
    phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

    const currentTime = 1587645900000; // in UTC milliseconds

    let startTime = subtractTime(currentTime, "3m");

    const testElements: IPHDSElement[] = [
      {
        openTime: 1587645720000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645779999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
      {
        openTime: 1587645780000,
        open: 0.085238,
        high: 0.085238,
        low: 0.085231,
        close: 0.085231,
        volume: 4.19,
        closeTime: 1587645839999,
        quoteVolume: 0.35713462,
        trades: 5,
        baseAssetVolume: 3.74,
        quoteAssetVolume: 0.31877864,
      } as IPHDSElement,
    ];

    const missingZones = phdsController.findMissingZones(
      testElements,
      currentTime,
      startTime
    );

    expect(missingZones.length).toBe(1);
  });
});
