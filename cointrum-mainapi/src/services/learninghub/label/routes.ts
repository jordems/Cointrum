import { Request, Response } from "express";
// import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../../middleware/checks";

export default [
  {
    path: "/api/v1/learninghub/{trainingmapid}/label/{labelid}/getseeds",
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
    path: "/api/v1/learninghub/{trainingmapid}/label/{labelid}/createseed",
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
    path: "/api/v1/learninghub/{trainingmapid}/label/{labelid}/editseed",
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
