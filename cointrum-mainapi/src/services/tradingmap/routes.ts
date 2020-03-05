import { Request, Response } from "express";

import { checkCreationHubParams } from "../../middleware/checks";
import classifierRoutes from "./classifier/routes";
import labelRoutes from "./label/routes";
import GenericController from "./../../utils/GenericController";
import { ITradingMap } from "../../models/TradingMap";
import TradingMap from "../../models/TradingMap";

/**
 * @constant tradingMapController
 * Handles all Interactions with the TradingMap Collection in db
 */

const tradingMapController = new GenericController<ITradingMap>(TradingMap);

export default [
  ...classifierRoutes,
  ...labelRoutes,
  {
    path: "/api/v1/tradingmap",
    method: "get",
    handler: [
      checkCreationHubParams,
      async (req: Request, res: Response) => {
        try {
          const tradingMaps = await tradingMapController.getAllDocuments();
          res.status(200).json(tradingMaps);
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap",
    method: "post",
    handler: [
      checkCreationHubParams,
      async (req: Request, res: Response) => {
        try {
          const newTradingMap = await tradingMapController.createDocument(
            req.body
          );
          res.status(200).json(newTradingMap);
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "get",
    handler: [
      checkCreationHubParams,
      async (req: Request, res: Response) => {
        try {
          const tradingMap = await tradingMapController.getDocumentbyId(
            req.params.tradingmapid
          );
          if (tradingMap === null) {
            res.status(400).json({ message: "Trading Map Doesn't Exist" });
          } else {
            res.status(200).json(tradingMap);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "put",
    handler: [
      checkCreationHubParams,
      async (req: Request, res: Response) => {
        try {
          const updatedTradingMap = await tradingMapController.editDocument(
            req.params.tradingmapid,
            req.body
          );

          if (updatedTradingMap === null) {
            res.json({
              updated: false,
              message: "Didn't Find Document to Update"
            });
          } else {
            res.status(200).json(updatedTradingMap);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "delete",
    handler: [
      checkCreationHubParams,
      async (req: Request, res: Response) => {
        try {
          const removedTradingMap = await tradingMapController.removeDocument(
            req.params.tradingmapid
          );

          if (removedTradingMap === null) {
            res.status(400).json({
              remove: false,
              message: "Didn't Find Document to Delete"
            });
          } else {
            res.status(200).json(removedTradingMap);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  }
];
