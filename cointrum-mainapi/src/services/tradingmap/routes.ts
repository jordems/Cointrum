import { checkCreationHubParams } from "../../middleware/checks";

import classifierRoutes from "./classifier/routes";
import labelRoutes from "./label/routes";

import GenericController from "./../../utils/GenericController";
import { ITradingMap } from "../../models/TradingMap";
import TradingMap from "../../models/TradingMap";

/**
 * @constant TradingMapController
 * Handles all Interactions with the TradingMap Collection in db
 */

const tradingMapController = new GenericController<ITradingMap>(TradingMap);

export default [
  ...classifierRoutes,
  ...labelRoutes,
  {
    path: "/api/v1/tradingmap",
    method: "get",
    handler: [checkCreationHubParams, tradingMapController.getAllDocuments]
  },
  {
    path: "/api/v1/tradingmap",
    method: "post",
    handler: [checkCreationHubParams, tradingMapController.createDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "get",
    handler: [checkCreationHubParams, tradingMapController.getDocumentbyId]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "put",
    handler: [checkCreationHubParams, tradingMapController.editDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "delete",
    handler: [checkCreationHubParams, tradingMapController.removeDocument]
  }
];
