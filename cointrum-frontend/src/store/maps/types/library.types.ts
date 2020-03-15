import { ITradingMap } from "./ITradingMap";

export interface State {
  maps: {
    [tradingmapid: number]: ITradingMap; //TODO TradingMap Schema Client
  };
  loadingMaps: boolean;
}

export const MAPLIBRARY_FETCH_MAPS = "MAPLIBRARY_FETCH_MAPS";
export const MAPLIBRARY_ADD_MAP = "MAPLIBRARY_ADD_MAP";
export const MAPLIBRARY_REMOVE_MAP = "MAPLIBRARY_REMOVE_MAP";

interface MapLibraryFetchMaps {
  type: typeof MAPLIBRARY_FETCH_MAPS;
  payload: {
    [tradingmapid: string]: ITradingMap; //TODO TradingMap Schema Client
  };
}
interface MapLibraryAddMap {
  type: typeof MAPLIBRARY_ADD_MAP;
  payload: ITradingMap;
}
interface MapLibraryRemoveMap {
  type: typeof MAPLIBRARY_REMOVE_MAP;
  payload: string;
}

export type Actions =
  | MapLibraryFetchMaps
  | MapLibraryAddMap
  | MapLibraryRemoveMap;
