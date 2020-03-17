import { ITradingMap } from "models";

export interface State {
  map: ITradingMap | null;
}

export const MAPCURRENT_SET_MAP = "MAPCURRENT_SET_MAPS";
export const MAPCURRENT_CLEAR_MAP = "MAPCURRENT_CLEAR_MAP";

interface MapCurrentSetMap {
  type: typeof MAPCURRENT_SET_MAP;
  payload: ITradingMap;
}
interface MapCurrentClearMap {
  type: typeof MAPCURRENT_CLEAR_MAP;
}

export type Actions = MapCurrentSetMap | MapCurrentClearMap;
