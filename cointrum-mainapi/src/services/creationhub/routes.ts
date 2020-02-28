import { Request, Response } from "express";
// import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: "/api/v1/creationhub/gettradingmaps",
    method: "post",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        res.status(200).send({});
      }
    ]
  },
  {
    path: "/api/v1/creationhub/createtradingmap",
    method: "post",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        res.status(200).send({});
      }
    ]
  },
  {
    path: "/api/v1/creationhub/edittradingmap",
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
