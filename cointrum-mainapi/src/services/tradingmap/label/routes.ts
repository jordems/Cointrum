import { checkLearningHubParams } from "../../../middleware/checks";
import { LabelController } from "./LabelController";

import seedRoutes from "./seed/routes";

const labelController = new LabelController();

export default [
  ...seedRoutes,
  {
    path: "/api/v1/tradingmap/:tradingmapid/label",
    method: "get",
    handler: [checkLearningHubParams, labelController.getLabels]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label",
    method: "post",
    handler: [checkLearningHubParams, labelController.createLabel]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "get",
    handler: [checkLearningHubParams, labelController.getLabelbyID]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "put",
    handler: [checkLearningHubParams, labelController.editLabel]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "delete",
    handler: [checkLearningHubParams, labelController.removeLabel]
  }
];
