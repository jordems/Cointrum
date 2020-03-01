import searchRoutes from "./search/routes";
import tradingmapRoutes from "./tradingmap/routes";
import learninghubRoutes from "./learninghub/routes";
import tradinghubRoutes from "./tradinghub/routes";

export default [
  ...searchRoutes,
  ...tradingmapRoutes,
  ...learninghubRoutes,
  ...tradinghubRoutes
];
