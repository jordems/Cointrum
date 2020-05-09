import { Model, Document, DocumentQuery } from "mongoose";
import Bottleneck from "bottleneck";
/**
 * @class GenericController
 * Generic REST Controller for MongoDB Documents
 */

export default class GenericController<T extends Document> {
  private model: Model<T>;

  public constructor(model: Model<T>) {
    this.model = model;
  }

  public getAllDocuments(): DocumentQuery<T[], T, {}> {
    return this.model.find({});
  }

  public queryDocuments(
    queryconditions: object,
    sortconditions?: object,
    limit?: number
  ): DocumentQuery<T[], T, {}> {
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

  public createDocument(documentData: T): Promise<T> {
    const newDocument: T = new this.model(documentData);

    return newDocument.save();
  }

  public insertBatch(batch: T[]): Promise<T[]> {
    return this.model.insertMany(batch);
  }

  public async insertMultipleBatches(
    batches: T[][],
    condition?: any
  ): Promise<T[]> {
    let results: T[] = [];

    for (const batch of batches) {
      const section = await this.insertBatch(batch);
      console.log("loaded Batch", section[0] && section[0]._id);
      if (condition && condition(section)) {
        console.log("Adding to Results");
        results = [...results, ...section];
      }
    }

    return results;
  }

  public getDocumentbyId(docid: string): DocumentQuery<T | null, T, {}> {
    return this.model.findById(docid);
  }
  public editDocument(
    docid: string,
    docData: T
  ): DocumentQuery<T | null, T, {}> {
    return this.model.findByIdAndUpdate(docid, docData, { new: true });
  }

  public removeDocument(docid: string): DocumentQuery<T | null, T, {}> {
    return this.model.findByIdAndRemove(docid);
  }
}
