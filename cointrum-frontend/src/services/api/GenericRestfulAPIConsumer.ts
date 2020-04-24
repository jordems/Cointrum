import axios from "axios";

import config from "services/api/config";
import { Error500, Error400 } from "services/api/ErrorTypes";

interface Document {
  _id: string;
}

export default class GenericRestfulAPIConsumer<
  DocumentModel extends Document,
  CreateModel
> {
  private path: string;
  constructor(path: string) {
    this.path = config.url + path;
  }

  public setPath(path: string) {
    this.path = config.url + path;
  }

  public fetchAllDocuments(): Promise<DocumentModel[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.path)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          const { response } = err;

          if (response && response.status === 400) {
            reject(Error400(response.data));
          } else {
            reject(Error500);
          }
        });
    });
  }
  public async fetchDocumentbyID(id: string): Promise<DocumentModel> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.path + `/${id}`)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          const { response } = err;

          if (response && response.status === 400) {
            reject(Error400(response.data));
          } else {
            reject(Error500);
          }
        });
    });
  }

  public async createDocument(doc: CreateModel): Promise<DocumentModel> {
    return new Promise((resolve, reject) => {
      console.log(doc);
      axios
        .post(this.path, doc)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          const { response } = err;

          if (response && response.status === 400) {
            reject(Error400(response.data));
          } else {
            reject(Error500);
          }
        });
    });
  }

  public editDocument(doc: DocumentModel): Promise<DocumentModel> {
    return new Promise((resolve, reject) => {
      axios
        .put(this.path + `/${doc._id}`, doc)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          const { response } = err;

          if (response && response.status === 400) {
            reject(Error400(response.data));
          } else {
            reject(Error500);
          }
        });
    });
  }

  public removeDocument(id: string): Promise<DocumentModel> {
    return new Promise((resolve, reject) => {
      axios
        .delete(this.path + `/${id}`)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          const { response } = err;

          if (response && response.status === 400) {
            reject(Error400(response.data));
          } else {
            reject(Error500);
          }
        });
    });
  }
}
