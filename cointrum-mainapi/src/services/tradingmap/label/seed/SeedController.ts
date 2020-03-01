import { ISeed } from "../../../../models/Seed";
import Seed from "../../../../models/Seed";
import { Request, Response } from "express";

export class SeedController {
  public getSeeds(req: Request, res: Response) {
    Seed.find({}, (err, seeds) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(seeds);
    });
  }

  public createSeed({ body }: Request, res: Response) {
    const newSeed: ISeed = new Seed(body);

    newSeed.save((err, seed) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(seed);
    });
  }

  public getSeedbyID({ params }: Request, res: Response) {
    Seed.findById(params.seedid, (err, seed) => {
      if (err) {
        res.send(err);
      }
      res.json(seed);
    });
  }
  public editSeed({ params, body }: Request, res: Response) {
    Seed.findByIdAndUpdate(
      params.seedid,
      body,
      { new: true },
      (err, updatedSeed) => {
        if (err) {
          res.send(err);
        } else if (updatedSeed == null) {
          res.json({
            updated: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json(updatedSeed);
        }
      }
    );
  }

  public removeSeed({ params }: Request, res: Response) {
    Seed.findByIdAndRemove(params.seedid, (err, removedSeed) => {
      if (err) {
        res.send(err);
      } else if (removedSeed == null) {
        res.json({
          removed: false,
          message: "Didn't Find Document to Delete"
        });
      } else {
        res.json({ removed: true, message: "Successfully deleted!" });
      }
    });
  }
}
