import { Request, Response } from "express";

import { checkphdsParams } from "../../middleware/checks";
import GenericController from "../../utils/GenericController";
import { ITradingMap } from "../../models/TradingMap";
import TradingMap from "../../models/TradingMap";
import PHDSController from "./PHDSController";
import { IExchanges } from "../../types/exchange";

/**
 * @constant phdsController
 * Handles all Interactions with the phds Collection in db
 */

const phdsController = new PHDSController();

export default [
  {
    path: "/api/v1/phds/:exchange",
    method: "get",
    handler: [
      checkphdsParams,
      async (req: Request, res: Response) => {
        try {
          const phdselements = await phdsController.getCandleSticks(req.params.exchange as IExchanges, req.query.basecurrency, req.query.altcurrency, req.query.interval, req.query.start, req.query.end);
          res.status(200).json(phdselements);
        } catch (err) {
          res.status(400).send(err);
        }
      },
    ],
  },
];
