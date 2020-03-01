import { checkTradingHubClassifierParams } from "../../../../middleware/checks";
import { ConfidenceValuesController } from "./ConfidenceValuesController";

const confidenceValuesController = new ConfidenceValuesController();

export default [
  {
    path:
      "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid/confidencevalues",
    method: "get",
    handler: [
      checkTradingHubClassifierParams,
      confidenceValuesController.getConfidenceValues
    ]
  },
  {
    path:
      "/api/v1/tradingmap/:tradingmapid/classifier/:classifierid/confidencevalues",
    method: "post",
    handler: [
      checkTradingHubClassifierParams,
      confidenceValuesController.setConfidenceValues
    ]
  }
];
