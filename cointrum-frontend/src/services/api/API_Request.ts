import axios from "axios";
import { Error400, Error500 } from "./ErrorTypes";
import config from "services/api/config";
import { addQueryParametersToURL } from "services/tools/URLParamaterTools";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type HTTPQueryParams = { [id: string]: string | number | boolean | undefined };

export const API_Request = (
  method: HTTPMethod,
  path:
    | string
    | {
        path: string;
        params: HTTPQueryParams;
      },
  data?: any
): Promise<any> => {
  // Add parameters onto Path
  let tpath: string;
  if (typeof path !== "string") {
    tpath = addQueryParametersToURL(config.url + path.path, path.params);
  } else {
    tpath = config.url + path;
  }

  switch (method) {
    case "GET":
      return new Promise((resolve, reject) => {
        axios
          .get(tpath)
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
    case "POST":
      return new Promise((resolve, reject) => {
        axios
          .post(tpath, data)
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
    case "PUT":
      return new Promise((resolve, reject) => {
        axios
          .put(tpath, data)
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
    case "PATCH":
      return new Promise((resolve, reject) => {
        axios
          .patch(tpath, data)
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
    case "DELETE":
      return new Promise((resolve, reject) => {
        axios
          .delete(tpath)
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
};
