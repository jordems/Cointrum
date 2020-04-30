import { API_Request } from "./API_Request";

interface Document {
  _id: string;
}

export default class GenericRestfulAPIConsumer<
  DocumentModel extends Document,
  CreateModel
> {
  private path: string;
  constructor(path: string) {
    this.path = path;
  }

  public setPath(path: string) {
    this.path = path;
  }

  public fetchAllDocuments(): Promise<DocumentModel[]> {
    return API_Request("GET", this.path);
  }
  public async fetchDocumentbyID(id: string): Promise<DocumentModel> {
    return API_Request("GET", this.path + `/${id}`);
  }

  public async createDocument(doc: CreateModel): Promise<DocumentModel> {
    return API_Request("POST", this.path, doc);
  }

  public editDocument(doc: DocumentModel): Promise<DocumentModel> {
    return API_Request("PUT", this.path + `/${doc._id}`, doc);
  }

  public removeDocument(id: string): Promise<DocumentModel> {
    return API_Request("DELETE", this.path + `/${id}`);
  }
}
