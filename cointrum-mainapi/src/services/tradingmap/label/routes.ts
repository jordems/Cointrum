import { checkLearningHubParams } from "../../../middleware/checks";

import seedRoutes from "./seed/routes";

import GenericController from "./../../../utils/GenericController";
import { ILabel } from "../../../models/Label";
import Label from "../../../models/Label";

/**
 * @constant LabelController
 * Handles all Interactions with the Label Collection in db
 */

const labelController = new GenericController<ILabel>(Label);

export default [
  ...seedRoutes,
  {
    path: "/api/v1/tradingmap/:tradingmapid/label",
    method: "get",
    handler: [checkLearningHubParams, labelController.getAllDocuments]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label",
    method: "post",
    handler: [checkLearningHubParams, labelController.createDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "get",
    handler: [checkLearningHubParams, labelController.getDocumentbyId]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "put",
    handler: [checkLearningHubParams, labelController.editDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid",
    method: "delete",
    handler: [checkLearningHubParams, labelController.removeDocument]
  }
];
