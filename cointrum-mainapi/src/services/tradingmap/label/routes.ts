import { Request, Response } from "express";

import { checkLearningHubParams } from "../../../middleware/checks";
import seedRoutes from "./seed/routes";
import GenericController from "./../../../utils/GenericController";
import { ILabel } from "../../../models/Label";
import Label from "../../../models/Label";

/**
 * @constant LabelController
 * Handles all Interactions with the Label Collection in db
 */

const labelController = new GenericController<ILabel>(Label);

export default [
  ...seedRoutes,
  {
    path: "/api/v1/tradingmap/:tradingmapid/label",
    method: "get",
    handler: [
      checkLearningHubParams,
      async ({ params }: Request, res: Response) => {
        try {
          const labels = await labelController.queryDocuments({
            tradingmapid: params.tradingmapid
          });
          res.status(200).json(labels);
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label",
    method: "post",
    handler: [
      checkLearningHubParams,
      async ({ body, params }: Request, res: Response) => {
        try {
          const newLabel = await labelController.createDocument({
            tradingmapid: params.tradingmapid,
            ...body
          });
          res.status(200).json(newLabel);
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "get",
    handler: [
      checkLearningHubParams,
      async ({ params }: Request, res: Response) => {
        try {
          const label = await labelController.getDocumentbyId(params.labelid);
          if (label === null) {
            res.status(400).json({ message: "Trading Map Doesn't Exist" });
          } else {
            res.status(200).json(label);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "put",
    handler: [
      checkLearningHubParams,
      async ({ params, body }: Request, res: Response) => {
        try {
          const updatedLabel = await labelController.editDocument(
            params.labelid,
            body
          );

          if (updatedLabel === null) {
            res.json({
              updated: false,
              message: "Didn't Find Document to Update"
            });
          } else {
            res.status(200).json(updatedLabel);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "delete",
    handler: [
      checkLearningHubParams,
      async ({ params }: Request, res: Response) => {
        try {
          const removedLabel = await labelController.removeDocument(
            params.labelid
          );

          if (removedLabel === null) {
            res.status(400).json({
              remove: false,
              message: "Didn't Find Document to Delete"
            });
          } else {
            res.status(200).json(removedLabel);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      }
    ]
  }
];
