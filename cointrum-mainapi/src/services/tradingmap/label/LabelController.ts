import { ILabel } from "../../../models/Label";
import Label from "../../../models/Label";
import { Request, Response } from "express";

export class LabelController {
  public getLabels(req: Request, res: Response) {
    Label.find({}, (err, labels) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(labels);
    });
  }

  public createLabel({ body }: Request, res: Response) {
    const newLabel: ILabel = new Label(body);

    newLabel.save((err, label) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(label);
    });
  }

  public getLabelbyID({ params }: Request, res: Response) {
    Label.findById(params.labelid, (err, label) => {
      if (err) {
        res.send(err);
      }
      res.json(label);
    });
  }
  public editLabel({ params, body }: Request, res: Response) {
    Label.findByIdAndUpdate(
      params.labelid,
      body,
      { new: true },
      (err, updatedLabel) => {
        if (err) {
          res.send(err);
        } else if (updatedLabel == null) {
          res.json({
            updated: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json(updatedLabel);
        }
      }
    );
  }

  public removeLabel({ params }: Request, res: Response) {
    Label.findByIdAndRemove(params.labelid, (err, removedLabel) => {
      if (err) {
        res.send(err);
      } else if (removedLabel == null) {
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
