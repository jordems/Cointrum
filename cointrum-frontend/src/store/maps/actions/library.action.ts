import * as MapLibraryTypes from "./../types/library.types";
import { ITradingMap } from "./../types/ITradingMap";

export function fetchMapLibrary(): MapLibraryTypes.Actions {
  //TODO Fetch from Mongodb
  const exampleMaps: {
    [tradingmapid: number]: ITradingMap; //TODO TradingMap Schema Client
  } = {};

  return {
    type: MapLibraryTypes.MAPLIBRARY_FETCH_MAPS,
    payload: exampleMaps
  };
}

export function addMaptoLibrary(map: ITradingMap): MapLibraryTypes.Actions {
  return {
    type: MapLibraryTypes.MAPLIBRARY_ADD_MAP,
    payload: map
  };
}

export function removeMapfromLibrary(mapid: string): MapLibraryTypes.Actions {
  return {
    type: MapLibraryTypes.MAPLIBRARY_REMOVE_MAP,
    payload: mapid
  };
}
