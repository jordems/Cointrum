import { checkLearningHubLabelsParams } from "../../../../middleware/checks";
import { SeedController } from "./SeedController";

const seedController = new SeedController();

export default [
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed",
    method: "get",
    handler: [checkLearningHubLabelsParams, seedController.getSeeds]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed",
    method: "post",
    handler: [checkLearningHubLabelsParams, seedController.createSeed]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "get",
    handler: [checkLearningHubLabelsParams, seedController.getSeedbyID]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "put",
    handler: [checkLearningHubLabelsParams, seedController.editSeed]
  },
  {
    path: "/api/v1/tradingmap/:tradingmapid/label/:labelid/seed/:seedid",
    method: "delete",
    handler: [checkLearningHubLabelsParams, seedController.removeSeed]
  }
];
