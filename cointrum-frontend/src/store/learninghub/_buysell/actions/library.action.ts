import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { AppState } from "store";
import GenericRestfulAPIConsumer from "services/api/GenericRestfulAPIConsumer";
import * as BuySellLibraryTypes from "./../types/library.types";
import * as BuySellCurrentTypes from "./../types/current.types";
import { IBuySell, ICreateBuySell } from "models";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

const buysellConsumer = new GenericRestfulAPIConsumer<IBuySell, ICreateBuySell>(
  `/tradingmap/$temp/buysell`
);

export const fetchBuySellLibrary = (): MyThunkResult<Promise<IBuySell[]>> => (
  dispatch: (e: BuySellLibraryTypes.Actions) => void,
  getState
): Promise<IBuySell[]> => {
  const currentTradingMap = getState().maps.current.map;

  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  buysellConsumer.setPath(`/tradingmap/${currentTradingMap._id}/buysell`);

  return new Promise((resolve, reject) => {
    buysellConsumer
      .fetchAllDocuments()
      .then((buysells) => {
        const fetchBuySell: { [buysellid: string]: IBuySell } = {};

        buysells.forEach((buysell) => {
          fetchBuySell[buysell._id] = buysell;
        });

        dispatch({
          type: BuySellLibraryTypes.BUYSELLLIBRARY_FETCH_TUPLES_SUCCESS,
          payload: fetchBuySell,
        });
        resolve(buysells);
      })
      .catch((err) => {
        dispatch({
          type: BuySellLibraryTypes.BUYSELLLIBRARY_FETCH_TUPLES_FAIL,
          payload: err,
        });
        reject();
      });
  });
};

export const editTupleinLibrary = (
  id: string,
  buysell: IBuySell
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: BuySellLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;

  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  buysellConsumer.setPath(`/tradingmap/${currentTradingMap._id}/buysell`);

  return new Promise((resolve, reject) => {
    buysellConsumer
      .editDocument({ _id: id, ...buysell } as IBuySell)
      .then((buysell) => {
        dispatch({
          type: BuySellLibraryTypes.BUYSELLLIBRARY_EDIT_TUPLE,
          payload: buysell,
        });
        resolve();
      })
      .catch((err) => {
        alert(err);
        reject();
      });
  });
};

export const removeTuplefromLibrary = (
  buysellid: string
): MyThunkResult<Promise<boolean>> => (
  dispatch: (
    e: BuySellLibraryTypes.Actions | BuySellCurrentTypes.Actions
  ) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;

  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  buysellConsumer.setPath(`/tradingmap/${currentTradingMap._id}/buysell`);

  return new Promise((resolve, reject) => {
    buysellConsumer
      .removeDocument(buysellid)
      .then((_buysell) => {
        dispatch({
          type: BuySellLibraryTypes.BUYSELLLIBRARY_REMOVE_TUPLE,
          payload: _buysell,
        });

        //TODO Popup that confirms deletion, but allows undo for x seconds

        resolve();
      })
      .catch((err) => {
        alert(err);
        //TODO Popup that says Removed Failed
        reject();
      });
  });
};
