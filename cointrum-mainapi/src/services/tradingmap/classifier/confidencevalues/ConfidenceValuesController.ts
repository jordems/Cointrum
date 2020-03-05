import { IConfidenceValues } from "../../../../models/ConfidenceValues";
import ConfidenceValues from "../../../../models/ConfidenceValues";
import { Request, Response } from "express";

/**
 * @class ConfidenceValuesController
 * Handles all Interactions with the ConfidenceValues Collection in db
 * Can't Use GenericController as it has it's own scheme
 */
export class ConfidenceValuesController {
  public getConfidenceValues(req: Request, res: Response) {
    ConfidenceValues.find({}, (err, confidenceValues) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(confidenceValues);
    });
  }

  public setConfidenceValues({ body }: Request, res: Response) {
    const newConfidenceValues: IConfidenceValues = new ConfidenceValues(body);

    newConfidenceValues.save((err, confidenceValues) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(confidenceValues);
    });
  }
}
