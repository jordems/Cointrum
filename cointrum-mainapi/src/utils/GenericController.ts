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

  public getAllDocuments() {
    return this.model.find({});
  }

  public async createDocument(documentData: T) {
    const newDocument: T = new this.model(documentData);

    return newDocument.save();
    //(err, document) => {
    //   if (err) {
    //     res.status(400).send(err);
    //   }
    //   res.json(document);
    // });
  }

  public getDocumentbyId(docid: string) {
    return this.model.findById(docid);

    // (err, document) => {
    //   if (err) {
    //     res.status(400).send(err);
    //   } else if (document === null) {
    //     res.status(400).send({ message: "Document Doesn't Exist" });
    //   } else {
    //     res.json(document);
    //   }
    // });
  }
  public editDocument(docid: string, docData: T) {
    return this.model.findByIdAndUpdate(docid, docData, { new: true });
    //   ,
    //   (err, updatedDocument) => {
    //     if (err) {
    //       res.status(400).send(err);
    //     } else if (updatedDocument == null) {
    //       res.json({
    //         updated: false,
    //         message: "Didn't Find Document to Update"
    //       });
    //     } else {
    //       res.json(updatedDocument);
    //     }
    //   }
    // );
  }

  public removeDocument(docid: string) {
    return this.model.findByIdAndRemove(docid);

    //   , (err, removedDocument) => {
    //   if (err) {
    //     res.status(400).send(err);
    //   } else if (removedDocument == null) {
    //     res.json({
    //       removed: false,
    //       message: "Didn't Find Document to Delete"
    //     });
    //   } else {
    //     res.json({ removed: true, message: "Successfully deleted!" });
    //   }
    // });
  }
}
