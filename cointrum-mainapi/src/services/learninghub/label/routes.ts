import { Request, Response } from "express";
import { checkLearningHubLabelsParams } from "../../../middleware/checks";

export default [
  {
    path: "/api/v1/learninghub/:tradingmapid/label/:labelid/getseeds",
    method: "get",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/learninghub/:tradingmapid/label/:labelid/createseed",
    method: "post",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/learninghub/:tradingmapid/label/:labelid/editseed",
    method: "put",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  },
  {
    path: "/api/v1/learninghub/:tradingmapid/label/:labelid/removeseed",
    method: "delete",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params, body }: Request, res: Response) => {
        res.status(200).send(params);
      }
    ]
  }
];
