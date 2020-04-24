import { Request, Response } from "express";

import { checkLearningHubLabelsParams } from "../../../../middleware/checks";
import GenericController from "../../../../utils/GenericController";
import { ISeed } from "../../../../models/Seed";
import Seed from "../../../../models/Seed";

/**
 * @constant SeedController
 * Handles all Interactions with the Seed Collection in db
 */

const seedController = new GenericController<ISeed>(Seed);

export default [
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed",
    method: "get",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params }: Request, res: Response) => {
        try {
          const seeds = await seedController.queryDocuments({
            labelid: params.labelid,
          });
          res.status(200).json(seeds);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed",
    method: "post",
    handler: [
      checkLearningHubLabelsParams,
      async ({ body, params }: Request, res: Response) => {
        try {
          const newSeed = await seedController.createDocument({
            labelid: params.labelid,
            ...body,
          });
          res.status(200).json(newSeed);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "get",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params }: Request, res: Response) => {
        try {
          const seed = await seedController.getDocumentbyId(params.seedid);
          if (seed === null) {
            res.status(400).json({ message: "Trading Map Doesn't Exist" });
          } else {
            res.status(200).json(seed);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "put",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params, body }: Request, res: Response) => {
        try {
          const updatedSeed = await seedController.editDocument(
            params.seedid,
            body
          );

          if (updatedSeed === null) {
            res.json({
              updated: false,
              message: "Didn't Find Document to Update",
            });
          } else {
            res.status(200).json(updatedSeed);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "delete",
    handler: [
      checkLearningHubLabelsParams,
      async ({ params }: Request, res: Response) => {
        try {
          const removedSeed = await seedController.removeDocument(
            params.seedid
          );

          if (removedSeed === null) {
            res.status(400).json({
              remove: false,
              message: "Didn't Find Document to Delete",
            });
          } else {
            res.status(200).json(removedSeed);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
];
