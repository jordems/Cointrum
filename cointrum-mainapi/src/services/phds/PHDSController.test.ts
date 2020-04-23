import { connectDB } from "./../../utils/Database";
import PHDSController from "./PHDSController";

describe("PHDSController: getCandleSticks()", () => {
  let phdsController: PHDSController;

  beforeAll(async (done) => {
    await connectDB();
    done();
  });

  describe("without start and end ", () => {
    test("wo/dbfilled", async (done) => {
      phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

      const candleSticks = await phdsController.getCandleSticks();

      expect(candleSticks.length).toBe(1);
      done();
    }, 30000);
    test("w/dbfilled", async (done) => {
      phdsController = new PHDSController("Binance", "BNB", "ETH", "1m");

      const candleSticks = await phdsController.getCandleSticks();

      expect(candleSticks.length).toBe(1);
      done();
    }, 30000);
  });

  describe("with start without end", () => {
    test("wo/dbfilled", async (done) => {
      done();
    });
    test("w/dbfilled", async (done) => {
      done();
    });
  });

  describe("with start and end", () => {
    test("wo/dbfilled", async (done) => {
      done();
    });
    test("w/dbfilled", async (done) => {
      done();
    });
  });
});
