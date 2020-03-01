import { TradingMapController } from "./TradingMapController";
import { checkCreationHubParams } from "../../middleware/checks";

import classifierRoutes from "./classifier/routes";
import labelRoutes from "./label/routes";

const tradingMapController = new TradingMapController();

export default [
  ...classifierRoutes,
  ...labelRoutes,
  {
    path: "/api/v1/tradingmap",
    method: "get",
    handler: [checkCreationHubParams, tradingMapController.getTradingMaps]
  },
  {
    path: "/api/v1/tradingmap",
    method: "post",
    handler: [checkCreationHubParams, tradingMapController.createTradingMap]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "get",
    handler: [checkCreationHubParams, tradingMapController.getTradingMapbyID]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "put",
    handler: [checkCreationHubParams, tradingMapController.editTradingMap]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid",
    method: "delete",
    handler: [checkCreationHubParams, tradingMapController.removeTradingMap]
  }
];
