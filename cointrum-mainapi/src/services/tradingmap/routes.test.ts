import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from ".";
import { connectDB } from "./../../utils/Database";

//@ts-ignore
global.console = {
  log: jest.fn(), // console.log are ignored in tests

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  error: console.error,
  warn: jest.fn(),
  info: console.info,
  debug: console.debug,
};

describe("routes: /tradingmap", () => {
  let router: Router;

  let addDocKeys: string[] = [];

  let sampleDocument = {
    name: "test1",
    desc: "desc",
    exchange: "binance",
    basecurrency: "USDT",
    altcurrency: "BNB",
  };

  beforeAll(async () => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
    await connectDB();
  });
  describe("get: /tradingmap", () => {
    test("a valid call", async (done) => {
      const response = await request(router)
        .get("/api/v1/tradingmap")
        .expect("Content-Type", /json/)
        .expect(200);

      done();
    });
    test("a bad call with wrong extention", async (done) => {
      const response = await request(router)
        .get("/api/v1123/tradingmap")
        .expect(404);

      done();
    });
  });
  describe("post: /tradingmap", () => {
    test("a valid call", async (done) => {
      const response = await request(router)
        .post("/api/v1/tradingmap")
        .send(sampleDocument)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      if (!response.body._id) {
        throw new Error("Missing Response _id");
      }

      addDocKeys.push(response.body._id);

      sampleDocument = response.body;
      done();
    });
    test("a bad call missing a required field `name`", async (done) => {
      const response = await request(router)
        .post("/api/v1/tradingmap")
        .send({
          desc: "desc",
          exchange: "binance",
          basecurrency: "USDT",
          altcurrency: "BNB",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      done();
    });
    test("a valid call missing a NON-required field `name`", async (done) => {
      const response = await request(router)
        .post("/api/v1/tradingmap")
        .send({
          name: "test3",
          desc: "desc",
          exchange: "binance",
          basecurrency: "USDT",
          altcurrency: "BNB",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      if (!response.body._id) {
        throw new Error("Missing Response _id");
      }

      addDocKeys.push(response.body._id);
      done();
    });
  });
  describe("get: /tradingmap/:tradingmapid", () => {
    test("a valid call", async (done) => {
      const response = await request(router)
        .get(`/api/v1/tradingmap/${addDocKeys[0]}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual(sampleDocument);
      done();
    });
    test("a valid call requesting non-existant id", async (done) => {
      const response = await request(router)
        .get(`/api/v1/tradingmap/non-ExistantIDbtw`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);
      done();
    });
    test("a bad call missing '/' between tradingmap and id", async (done) => {
      const response = await request(router)
        .get(`/api/v1/tradingmap${addDocKeys[0]}`)
        .expect(404);
      done();
    });
  });
  describe("put: /tradingmap/:tradingmapid", () => {
    test("a valid call updating name", async (done) => {
      const response = await request(router)
        .put(`/api/v1/tradingmap/${addDocKeys[0]}`)
        .send({
          name: "new name",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      if (!response.body._id) {
        throw new Error("Missing Response _id");
      }

      done();
    });

    // Expect update to work, but ignore fields not in schema
    test("testing code injection attempt", async (done) => {
      const response = await request(router)
        .put(`/api/v1/tradingmap/${addDocKeys[0]}`)
        .send({
          name: "new name12",
          NonExisitingField: "bad data",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      if (!response.body._id) {
        throw new Error("Missing Response _id");
      }

      if (response.body.NonExisitingField) {
        throw new Error("Code Injection Successful.");
      }

      done();
    });

    test("attempt to update non-existing map", async (done) => {
      const response = await request(router)
        .put(`/api/v1/tradingmap/non-ExistantIDbtw`)
        .send({
          name: "Name2",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      done();
    });
  });
  describe("delete: /tradingmap/:tradingmapid", () => {
    test("deleting keys created during test", async (done) => {
      for (let x = 0; x < addDocKeys.length; x++) {
        const response = await request(router)
          .delete(`/api/v1/tradingmap/${addDocKeys[x]}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200);
      }

      done();
    });
  });
});
