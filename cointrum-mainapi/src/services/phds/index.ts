import { Request, Response } from "express";

import { checkphdsParams } from "../../middleware/checks";
import PHDSController from "./PHDSController";
import { IExchanges } from "../../types/exchange";

/**
 * @constant phdsController
 * Handles all Interactions with the phds Collection in db
 */

let phdsController: PHDSController;

export default [
  {
    path: "/api/v1/phds/:exchange",
    method: "get",
    handler: [
      checkphdsParams,
      async (req: Request, res: Response) => {
        phdsController = new PHDSController(
          req.params.exchange as IExchanges,
          req.query.basecurrency,
          req.query.altcurrency,
          req.query.interval
        );
        try {
          const phdselements = await phdsController.getPHDS(
            req.query.start,
            req.query.end
          );
          res.status(200).json(phdselements);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
];
