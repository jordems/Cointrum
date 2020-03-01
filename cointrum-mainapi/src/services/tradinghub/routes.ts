import { Request, Response } from "express";
import { checkTradingHubParams } from "./../../middleware/checks";

import classifierroutes from "./classifier/routes";

export default [
  ...classifierroutes,
  {
    path: "/api/v1/tradinghub/:tradingmapid/getclassifiers",
    method: "get",
    handler: [
      checkTradingHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/tradinghub/:tradingmapid/createclassifier",
    method: "post",
    handler: [
      checkTradingHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/tradinghub/:tradingmapid/editclassifier",
    method: "put",
    handler: [
      checkTradingHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/tradinghub/:tradingmapid/removeclassifier",
    method: "delete",
    handler: [
      checkTradingHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(JSON.stringify(params));
      }
    ]
  }
];
