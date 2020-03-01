import { Request, Response } from "express";
import { checkTradingHubClassifierParams } from "../../../middleware/checks";

export default [
  {
    path:
      "/api/v1/tradinghub/:tradingmapid/classifier/:classifierid/getconfidencevalues",
    method: "get",
    handler: [
      checkTradingHubClassifierParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path:
      "/api/v1/tradinghub/:tradingmapid/classifier/:classifierid/setconfidencevalues",
    method: "post",
    handler: [
      checkTradingHubClassifierParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  }
];
