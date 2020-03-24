import { ITradingMap } from "models";
import { IError } from "services/api/ErrorTypes";

export interface State {
  maps: {
    [tradingmapid: string]: ITradingMap;
  };
  error?: IError;
  loadingMaps: boolean;
}

export const MAPLIBRARY_FETCH_MAPS_SUCCESS = "MAPLIBRARY_FETCH_MAPS_SUCCESS";
export const MAPLIBRARY_FETCH_MAPS_FAIL = "MAPLIBRARY_FETCH_MAPS_FAIL";

export const MAPLIBRARY_ADD_MAP = "MAPLIBRARY_ADD_MAP";
export const MAPLIBRARY_EDIT_MAP = "MAPLIBRARY_EDIT_MAP";
export const MAPLIBRARY_REMOVE_MAP = "MAPLIBRARY_REMOVE_MAP";

interface MapLibraryFetchMapsSuccess {
  type: typeof MAPLIBRARY_FETCH_MAPS_SUCCESS;
  payload: {
    [tradingmapid: string]: ITradingMap;
  };
}

interface MapLibraryFetchMapsFail {
  type: typeof MAPLIBRARY_FETCH_MAPS_FAIL;
  payload: IError;
}

interface MapLibraryAddMap {
  type: typeof MAPLIBRARY_ADD_MAP;
  payload: ITradingMap;
}
interface MapLibraryEditMap {
  type: typeof MAPLIBRARY_EDIT_MAP;
  payload: ITradingMap;
}
interface MapLibraryRemoveMap {
  type: typeof MAPLIBRARY_REMOVE_MAP;
  payload: string;
}

export type Actions =
  | MapLibraryFetchMapsSuccess
  | MapLibraryFetchMapsFail
  | MapLibraryAddMap
  | MapLibraryEditMap
  | MapLibraryRemoveMap;
