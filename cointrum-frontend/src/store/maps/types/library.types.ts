export interface State {
  maps: {
    [tradingmapid: number]: any; //TODO TradingMap Schema Client
  };
  loadingMaps: boolean;
}

export const MAPLIBRARY_FETCH_MAPS = "MAPLIBRARY_FETCH_MAPS";
export const MAPLIBRARY_ADD_MAP = "MAPLIBRARY_ADD_MAP";
export const MAPLIBRARY_REMOVE_MAP = "MAPLIBRARY_REMOVE_MAP";

interface MapLibraryFetchMaps {
  type: typeof MAPLIBRARY_FETCH_MAPS;
  payload: {
    [tradingmapid: number]: any; //TODO TradingMap Schema Client
  };
}
interface MapLibraryAddMap {
  type: typeof MAPLIBRARY_ADD_MAP;
  payload: any;
}
interface MapLibraryRemoveMap {
  type: typeof MAPLIBRARY_REMOVE_MAP;
  payload: string;
}

export type Actions =
  | MapLibraryFetchMaps
  | MapLibraryAddMap
  | MapLibraryRemoveMap;
