import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import RestfulAPIConsumer from "services/api/RestfulAPIConsumer";
import * as MapLibraryTypes from "./../types/library.types";
import * as MapCreateTypes from "./../types/create.types";
import { ITradingMap, ICreateTradingMap } from "models";

type MyThunkResult<R> = ThunkAction<
  R,
  MapLibraryTypes.State,
  undefined,
  Action
>;

const tradingMapConsumer = new RestfulAPIConsumer<
  ITradingMap,
  ICreateTradingMap
>("/tradingmap");

export const fetchMapLibrary = (): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: MapLibraryTypes.Actions) => void
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    tradingMapConsumer
      .fetchAllDocuments()
      .then(tradingMaps => {
        const fetchMap: { [tradingmapid: string]: ITradingMap } = {};

        tradingMaps.forEach(map => {
          fetchMap[map._id] = map;
        });

        dispatch({
          type: MapLibraryTypes.MAPLIBRARY_FETCH_MAPS_SUCCESS,
          payload: fetchMap
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: MapLibraryTypes.MAPLIBRARY_FETCH_MAPS_FAIL,
          payload: err
        });
        reject();
      });
  });
};

export const addMaptoLibrary = (
  map: ICreateTradingMap
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: MapCreateTypes.Actions | MapLibraryTypes.Actions) => void
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    tradingMapConsumer
      .createDocument(map)
      .then(tradingMap => {
        // Reset Map Creation Form Fields
        dispatch({
          type: MapCreateTypes.MAPCREATE_RESET_FORM
        });

        // Add Map to Library
        dispatch({
          type: MapLibraryTypes.MAPLIBRARY_ADD_MAP,
          payload: tradingMap
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: MapCreateTypes.MAPCREATE_CREATION_FAILED,
          payload: err
        });
        reject();
      });
  });
};

export const editMapinLibrary = (
  id: string,
  map: ICreateTradingMap
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: MapCreateTypes.Actions | MapLibraryTypes.Actions) => void
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    tradingMapConsumer
      .editDocument({ _id: id, ...map } as ITradingMap)
      .then(tradingMap => {
        // Reset Map Dialog Form Fields
        dispatch({
          type: MapCreateTypes.MAPCREATE_RESET_FORM
        });

        // Add Map to Library
        dispatch({
          type: MapLibraryTypes.MAPLIBRARY_EDIT_MAP,
          payload: tradingMap
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: MapCreateTypes.MAPCREATE_CREATION_FAILED,
          payload: err
        });
        reject();
      });
  });
};

export const removeMapfromLibrary = (
  mapid: string
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: MapLibraryTypes.Actions) => void
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    tradingMapConsumer
      .removeDocument(mapid)
      .then(_tradingMap => {
        // Remove Map from Library
        dispatch({
          type: MapLibraryTypes.MAPLIBRARY_REMOVE_MAP,
          payload: mapid
        });

        //TODO Popup that confirms deletion, but allows undo for x seconds

        resolve();
      })
      .catch(err => {
        console.log(err);
        //TODO Popup that says Map Removed Failed
        reject();
      });
  });
};
