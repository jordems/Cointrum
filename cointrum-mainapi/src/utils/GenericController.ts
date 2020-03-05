import { Request, Response } from "express";
import { Model, Document } from "mongoose";
/**
 * @class GenericController
 * Generic REST Controller for MongoDB Documents
 */

export default class GenericController<T extends Document> {
  private model: Model<T>;

  public constructor(model: Model<T>) {
    this.model = model;
  }

  public getAllDocuments(req: Request, res: Response) {
    this.model.find({}, (err, tradingMaps) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(tradingMaps);
    });
  }

  public createDocument({ body }: Request, res: Response) {
    const newDocument: T = new this.model(body);

    newDocument.save((err, document) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(document);
    });
  }

  public getDocumentbyId({ params }: Request, res: Response) {
    this.model.findById(params.tradingmapid, (err, document) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(document);
    });
  }
  public editDocument({ params, body }: Request, res: Response) {
    this.model.findByIdAndUpdate(
      params.tradingmapid,
      body,
      { new: true },
      (err, updatedDocument) => {
        if (err) {
          res.status(400).send(err);
        } else if (updatedDocument == null) {
          res.json({
            updated: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json(updatedDocument);
        }
      }
    );
  }

  public removeDocument({ params }: Request, res: Response) {
    this.model.findByIdAndRemove(
      params.tradingmapid,
      (err, removedDocument) => {
        if (err) {
          res.status(400).send(err);
        } else if (removedDocument == null) {
          res.json({
            removed: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json({ removed: true, message: "Successfully deleted!" });
        }
      }
    );
  }
}
