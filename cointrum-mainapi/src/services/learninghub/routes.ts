import { Request, Response } from "express";
// import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "./../../middleware/checks";

import labelroutes from "./label/routes";

export default [
  ...labelroutes,
  {
    path: "/api/v1/learninghub/{tradingmapid}/getlabels",
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
    path: "/api/v1/learninghub/{tradingmapid}/createlabel",
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
    path: "/api/v1/learninghub/{tradingmapid}/editlabel",
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
    path: "/api/v1/learninghub/{tradingmapid}/removelabel",
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
