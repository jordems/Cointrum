import { checkTradingHubParams } from "../../../middleware/checks";
import { ClassifierController } from "./ClassifierController";

import confidencevaluesRoutes from "./confidencevalues/routes";

const classifierController = new ClassifierController();

export default [
  ...confidencevaluesRoutes,
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier",
    method: "get",
    handler: [checkTradingHubParams, classifierController.getClassifiers]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier",
    method: "post",
    handler: [checkTradingHubParams, classifierController.createClassifier]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "get",
    handler: [checkTradingHubParams, classifierController.getClassifierbyID]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "put",
    handler: [checkTradingHubParams, classifierController.editClassifier]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid",
    method: "delete",
    handler: [checkTradingHubParams, classifierController.removeClassifier]
  }
];
