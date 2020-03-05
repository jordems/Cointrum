import { checkLearningHubLabelsParams } from "../../../../middleware/checks";

import GenericController from "./../../../../utils/GenericController";
import { ISeed } from "../../../../models/Seed";
import Seed from "../../../../models/Seed";

/**
 * @constant SeedController
 * Handles all Interactions with the Seed Collection in db
 */

const seedController = new GenericController<ISeed>(Seed);

export default [
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed",
    method: "get",
    handler: [checkLearningHubLabelsParams, seedController.getAllDocuments]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed",
    method: "post",
    handler: [checkLearningHubLabelsParams, seedController.createDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "get",
    handler: [checkLearningHubLabelsParams, seedController.getDocumentbyId]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "put",
    handler: [checkLearningHubLabelsParams, seedController.editDocument]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "delete",
    handler: [checkLearningHubLabelsParams, seedController.removeDocument]
  }
];
