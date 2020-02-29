import { Request, Response } from "express";
// import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../../middleware/checks";

export default [
  {
    path:
      "/api/v1/tradinghub/{tradingmapid}/classifier/{classifierid}/getConfidenceValues",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        res.status(200).send({});
      }
    ]
  },
  {
    path:
      "/api/v1/tradinghub/{tradingmapid}/classifier/{classifierid}/setConfidenceValues",
    method: "post",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        res.status(200).send({});
      }
    ]
  }
];
