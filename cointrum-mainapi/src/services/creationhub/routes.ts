import { Request, Response } from "express";
// import { getPlacesByName } from "./SearchController";
import { checkCreationHubParams } from "../../middleware/checks";

export default [
  {
    path: "/api/v1/creationhub/gettradingmaps",
    method: "get",
    handler: [
      checkCreationHubParams,
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        res.status(200).send("testubg gaga");
      }
    ]
  },
  {
    path: "/api/v1/creationhub/createtradingmap",
    method: "post",
    handler: [
      checkCreationHubParams,
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
      checkCreationHubParams,
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        res.status(200).send({});
      }
    ]
  },
  {
    path: "/api/v1/creationhub/removetradingmap",
    method: "post",
    handler: [
      checkCreationHubParams,
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        res.status(200).send({});
      }
    ]
  }
];
