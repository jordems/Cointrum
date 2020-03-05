import { checkTradingHubParams } from "../../../middleware/checks";

import confidencevaluesRoutes from "./confidencevalues/routes";

import GenericController from "./../../../utils/GenericController";
import { IClassifier } from "../../../models/Classifier";
import Classifier from "../../../models/Classifier";

/**
 * @constant ClassifierController
 * Handles all Interactions with the Classifier Collection in db
 */

const classifierController = new GenericController<IClassifier>(Classifier);

export default [
  ...confidencevaluesRoutes,
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier",
    method: "get",
    handler: [checkTradingHubParams, classifierController.getAllDocuments]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier",
    method: "post",
    handler: [checkTradingHubParams, classifierController.createDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "get",
    handler: [checkTradingHubParams, classifierController.getDocumentbyId]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "put",
    handler: [checkTradingHubParams, classifierController.editDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "delete",
    handler: [checkTradingHubParams, classifierController.removeDocument]
  }
];
