import { Request, Response } from "express";

import { checkLearningHubBuySellParams } from "../../../middleware/checks";
import GenericController from "../../../utils/GenericController";
import { IBuySell } from "../../../models/BuySell";
import BuySell from "../../../models/BuySell";

/**
 * @constant SeedController
 * Handles all Interactions with the Seed Collection in db
 */

const buysellController = new GenericController<IBuySell>(BuySell);

export default [
  {
    path: "/api/v1/tradingmap/:tradingmapid/buysell",
    method: "get",
    handler: [
      checkLearningHubBuySellParams,
      async ({ params }: Request, res: Response) => {
        try {
          const seeds = await buysellController.queryDocuments({
            tradingmapid: params.tradingmapid,
          });
          res.status(200).json(seeds);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/buysell",
    method: "post",
    handler: [
      checkLearningHubBuySellParams,
      async ({ body, params }: Request, res: Response) => {
        try {
          const newTuple = await buysellController.createDocument({
            tradingmapid: params.tradingmapid,
            ...body,
          });
          res.status(200).json(newTuple);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/buysell/:buysellid",
    method: "get",
    handler: [
      checkLearningHubBuySellParams,
      async ({ params }: Request, res: Response) => {
        try {
          const buysell = await buysellController.getDocumentbyId(
            params.buysellid
          );
          if (buysell === null) {
            res.status(400).json({ message: "BuySell Doesn't Exist" });
          } else {
            res.status(200).json(buysell);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/buysell/:buysellid",
    method: "put",
    handler: [
      checkLearningHubBuySellParams,
      async ({ params, body }: Request, res: Response) => {
        try {
          const updatedTuple = await buysellController.editDocument(
            params.buysellid,
            body
          );

          if (updatedTuple === null) {
            res.json({
              updated: false,
              message: "Didn't Find Document to Update",
            });
          } else {
            res.status(200).json(updatedTuple);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/buysell/:buysellid",
    method: "delete",
    handler: [
      checkLearningHubBuySellParams,
      async ({ params }: Request, res: Response) => {
        try {
          const removedTuple = await buysellController.removeDocument(
            params.buysellid
          );

          if (removedTuple === null) {
            res.status(400).json({
              remove: false,
              message: "Didn't Find Document to Delete",
            });
          } else {
            res.status(200).json(removedTuple);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
];
