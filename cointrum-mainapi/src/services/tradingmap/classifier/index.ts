import { Request, Response } from "express";

import { checkTradingHubParams } from "../../../middleware/checks";
import GenericController from "../../../utils/GenericController";
import { IClassifier } from "../../../models/Classifier";
import Classifier from "../../../models/Classifier";

/**
 * @constant ClassifierController
 * Handles all Interactions with the Classifier Collection in db
 */

const classifierController = new GenericController<IClassifier>(Classifier);

export default [
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier",
    method: "get",
    handler: [
      checkTradingHubParams,
      async ({ params }: Request, res: Response) => {
        try {
          const classifiers = await classifierController.queryDocuments({
            tradingmapid: params.tradingmapid,
          });
          res.status(200).json(classifiers);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier",
    method: "post",
    handler: [
      checkTradingHubParams,
      async ({ body, params }: Request, res: Response) => {
        try {
          const newClassifier = await classifierController.createDocument({
            tradingmapid: params.tradingmapid,
            ...body,
          });
          res.status(200).json(newClassifier);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "get",
    handler: [
      checkTradingHubParams,
      async ({ params }: Request, res: Response) => {
        try {
          const classifier = await classifierController.getDocumentbyId(
            params.classifierid
          );
          if (classifier === null) {
            res.status(400).json({ message: "Trading Map Doesn't Exist" });
          } else {
            res.status(200).json(classifier);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "put",
    handler: [
      checkTradingHubParams,
      async ({ params, body }: Request, res: Response) => {
        try {
          const updatedClassifier = await classifierController.editDocument(
            params.classifierid,
            body
          );

          if (updatedClassifier === null) {
            res.json({
              updated: false,
              message: "Didn't Find Document to Update",
            });
          } else {
            res.status(200).json(updatedClassifier);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "delete",
    handler: [
      checkTradingHubParams,
      async ({ params }: Request, res: Response) => {
        try {
          const removedClassifier = await classifierController.removeDocument(
            params.classifierid
          );

          if (removedClassifier === null) {
            res.status(400).json({
              remove: false,
              message: "Didn't Find Document to Delete",
            });
          } else {
            res.status(200).json(removedClassifier);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
];
