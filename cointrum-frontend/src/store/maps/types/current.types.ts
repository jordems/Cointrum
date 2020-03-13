import { ITradingMap } from "./ITradingMap";

export interface State {
  map: ITradingMap | null;
}

export const MAPCURRENT_SET_MAP = "MAPCURRENT_SET_MAPS";
export const MAPCURRENT_EDIT_MAP = "MAPCURRENT_EDIT_MAP";

interface MapCurrentSetMap {
  type: typeof MAPCURRENT_SET_MAP;
  payload: ITradingMap;
}
interface MapCurrentEditMap {
  type: typeof MAPCURRENT_EDIT_MAP;
  payload: ITradingMap;
}

export type Actions = MapCurrentSetMap | MapCurrentEditMap;
