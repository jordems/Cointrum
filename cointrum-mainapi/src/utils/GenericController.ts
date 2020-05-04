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

  public queryDocuments(
    queryconditions: object,
    sortconditions?: object,
    limit?: number
  ) {
    if (sortconditions && limit) {
      return this.model.find(queryconditions).sort(sortconditions).limit(limit);
    } else if (limit) {
      return this.model.find(queryconditions).limit(limit);
    } else if (sortconditions) {
      return this.model.find(queryconditions).sort(sortconditions);
    } else {
      return this.model.find(queryconditions);
    }
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
