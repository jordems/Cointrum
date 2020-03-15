import * as MapLibraryTypes from "./../types/library.types";
import { ITradingMap } from "./../types/ITradingMap";

export function fetchMapLibrary(): MapLibraryTypes.Actions {
  //TODO Fetch from Mongodb
  const exampleMaps: {
    [tradingmapid: string]: ITradingMap; //TODO TradingMap Schema Client
  } = {
    Testid: {
      _id: "Testid",
      name: "My Test Map",
      exchange: "Binance",
      basecurrency: "BNB",
      altcurrency: "BTC",
      desc: "Desc"
    }
  };

  return {
    type: MapLibraryTypes.MAPLIBRARY_FETCH_MAPS,
    payload: exampleMaps
  };
}

export function addMaptoLibrary(map: ITradingMap): MapLibraryTypes.Actions {
  //TODO Add to Mongodb
  return {
    type: MapLibraryTypes.MAPLIBRARY_ADD_MAP,
    payload: map
  };
}

export function removeMapfromLibrary(mapid: string): MapLibraryTypes.Actions {
  //TODO Delete from Mongodb
  return {
    type: MapLibraryTypes.MAPLIBRARY_REMOVE_MAP,
    payload: mapid
  };
}
