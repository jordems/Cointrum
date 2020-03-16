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

  public queryDocuments(conditions: object) {
    return this.model.find(conditions);
  }

  public createDocument(documentData: T) {
    const newDocument: T = new this.model(documentData);

    return newDocument.save();
  }

  public getDocumentbyId(docid: string) {
    return this.model.findById(docid);
  }
  public editDocument(docid: string, docData: T) {
    return this.model.findByIdAndUpdate(docid, docData, { new: true });
  }

  public removeDocument(docid: string) {
    return this.model.findByIdAndRemove(docid);
  }
}
