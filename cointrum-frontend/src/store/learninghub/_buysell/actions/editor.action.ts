import * as BuySellEditorTypes from "../types/editor.types";
import * as BuySellLibraryTypes from "../types/library.types";

import { AppState } from "store";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import GenericRestfulAPIConsumer from "services/api/GenericRestfulAPIConsumer";
import { ICreateBuySell, IBuySell } from "models";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

export const addBuySellUL = (tuple: ICreateBuySell) => (
  dispatch: (e: BuySellEditorTypes.Actions) => void,
  getState: () => AppState
): void => {
  const selection = getState().learninghub.buysell.current.selection;
  console.log("AddBuySelltoUL", selection, tuple);

  dispatch({
    type: BuySellEditorTypes.BUYSELLEDITOR_ADD_TUPLE,
    payload: tuple,
  });
};

export const editBuySellUL = (tuple: ICreateBuySell) => (
  dispatch: (e: BuySellEditorTypes.Actions) => void
): void => {
  dispatch({
    type: BuySellEditorTypes.BUYSELLEDITOR_EDIT_TUPLE,
    payload: tuple,
  });
};

export const removeBuySellUL = (tuple: ICreateBuySell) => (
  dispatch: (e: BuySellEditorTypes.Actions) => void
): void => {
  dispatch({
    type: BuySellEditorTypes.BUYSELLEDITOR_REMOVE_TUPLE,
    payload: tuple,
  });
};

export const clearBuySellUL = () => (
  dispatch: (e: BuySellEditorTypes.Actions) => void
): void => {
  dispatch({
    type: BuySellEditorTypes.BUYSELLEDITOR_CLEAR_TUPLES,
  });
};

export const learnTuples = (): MyThunkResult<Promise<boolean>> => (
  dispatch: (
    e: BuySellEditorTypes.Actions | BuySellLibraryTypes.Actions
  ) => void,
  getState
): Promise<boolean> => {
  dispatch({
    type: BuySellEditorTypes.BUYSELLEDITOR_LEARN_ATTEMPT,
  });
  const currenttradingMap = getState().maps.current.map;
  const ulbuysell = getState().learninghub.buysell.editor.ulbuysell;

  if (!currenttradingMap) {
    alert("No Map Selected");
    return Promise.reject();
  }

  const buysellConsumer = new GenericRestfulAPIConsumer<
    IBuySell,
    ICreateBuySell
  >(`/tradingmap/${currenttradingMap._id}/buysell`);
  return new Promise((resolve, reject) => {
    let tupleInsertPromises: Promise<IBuySell>[] = [];
    Object.keys(ulbuysell).forEach((buysellTID) => {
      tupleInsertPromises.push(
        buysellConsumer.createDocument(ulbuysell[buysellTID])
      );
    });

    Promise.all(tupleInsertPromises)
      .then((learnedTuples) => {
        let insertableObject: { [_id: string]: IBuySell } = {};

        for (const ltup of learnedTuples) {
          insertableObject[ltup._id] = ltup;
        }
        dispatch({
          type: BuySellLibraryTypes.BUYSELLLIBRARY_ADD_TUPLES,
          payload: insertableObject,
        });
        dispatch({
          type: BuySellEditorTypes.BUYSELLEDITOR_LEARN_SUCCESS,
        });
        resolve();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: BuySellEditorTypes.BUYSELLEDITOR_LEARN_FAIL,
          payload: err,
        });
        reject();
      });
  });
};
