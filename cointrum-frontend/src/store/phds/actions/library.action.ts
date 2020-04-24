import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { AppState } from "store";

import * as PHDSLibraryTypes from "../types/library.types";
import PHDSAPIConsumer from "../PHDSAPIConsumer";
import subtractTime from "services/tools/subtractTime";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

const phdsConsumer = new PHDSAPIConsumer();

export const fetchInitialPHDS = (): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: PHDSLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;
  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  dispatch({
    type: PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_REQUEST,
  });

  const currentTime = new Date().getTime(); // in UTC milliseconds

  let startTime = subtractTime(
    currentTime,
    currentTradingMap.cycleduration,
    1000
  );

  return new Promise((resolve, reject) => {
    phdsConsumer
      .fetchCandles(
        currentTradingMap.exchange,
        currentTradingMap.basecurrency,
        currentTradingMap.altcurrency,
        currentTradingMap.cycleduration,
        startTime
      )
      .then((phdselements) => {
        dispatch({
          type: PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_SUCCESS,
          payload: phdselements,
        });
        resolve();
      })
      .catch((err) => {
        dispatch({
          type: PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_FAIL,
          payload: err,
        });
        reject();
      });
  });
};

export const fetchPHDSRange = (
  start?: number,
  end?: number
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: PHDSLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;
  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  dispatch({
    type: PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_REQUEST,
  });

  return new Promise((resolve, reject) => {
    phdsConsumer
      .fetchCandles(
        currentTradingMap.exchange,
        currentTradingMap.basecurrency,
        currentTradingMap.altcurrency,
        currentTradingMap.cycleduration,
        start,
        end
      )
      .then((phdselements) => {
        dispatch({
          type: PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_SUCCESS,
          payload: phdselements,
        });
        resolve();
      })
      .catch((err) => {
        dispatch({
          type: PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_FAIL,
          payload: err,
        });
        reject();
      });
  });
};
