import { Request, Response } from "express";
import { checkLearningHubParams } from "./../../middleware/checks";

import labelroutes from "./label/routes";

export default [
  ...labelroutes,
  {
    path: "/api/v1/learninghub/:tradingmapid/getlabels",
    method: "get",
    handler: [
      checkLearningHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(`Param: ${params.tradingmapid}`);
      }
    ]
  },
  {
    path: "/api/v1/learninghub/:tradingmapid/createlabel",
    method: "post",
    handler: [
      checkLearningHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/learninghub/:tradingmapid/editlabel",
    method: "put",
    handler: [
      checkLearningHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/learninghub/:tradingmapid/removelabel",
    method: "delete",
    handler: [
      checkLearningHubParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  }
];
