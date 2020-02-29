import searchRoutes from "./search/routes";
import creationhubRoutes from "./creationhub/routes";
import learninghubRoutes from "./learninghub/routes";
import tradinghubRoutes from "./tradinghub/routes";

export default [
  ...searchRoutes,
  ...creationhubRoutes,
  ...learninghubRoutes,
  ...tradinghubRoutes
];
