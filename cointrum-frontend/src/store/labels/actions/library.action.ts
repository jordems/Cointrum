import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { AppState } from "store";
import RestfulAPIConsumer from "services/api/RestfulAPIConsumer";
import * as LabelLibraryTypes from "./../types/library.types";
import * as LabelCreateTypes from "./../types/create.types";
import * as LabelCurrentTypes from "./../types/current.types";
import { ILabel, ICreateLabel } from "models";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

const labelConsumer = new RestfulAPIConsumer<ILabel, ICreateLabel>(
  `/tradinglabel/$temp/label`
);

export const fetchLabelLibrary = (): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: LabelLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;

  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  labelConsumer.setPath(`/tradinglabel/${currentTradingMap._id}/label`);

  return new Promise((resolve, reject) => {
    labelConsumer
      .fetchAllDocuments()
      .then(labels => {
        const fetchLabel: { [labelid: string]: ILabel } = {};

        labels.forEach(label => {
          fetchLabel[label._id] = label;
        });

        dispatch({
          type: LabelLibraryTypes.LABELLIBRARY_FETCH_LABELS_SUCCESS,
          payload: fetchLabel
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: LabelLibraryTypes.LABELLIBRARY_FETCH_LABELS_FAIL,
          payload: err
        });
        reject();
      });
  });
};

export const addLabeltoLibrary = (
  label: ICreateLabel
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: LabelCreateTypes.Actions | LabelLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;

  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  labelConsumer.setPath(`/tradinglabel/${currentTradingMap._id}/label`);

  return new Promise((resolve, reject) => {
    labelConsumer
      .createDocument({ tradingmapid: currentTradingMap._id, ...label })
      .then(label => {
        // Reset Label Creation Form Fields
        dispatch({
          type: LabelCreateTypes.LABELCREATE_RESET_FORM
        });

        // Add Label to Library
        dispatch({
          type: LabelLibraryTypes.LABELLIBRARY_ADD_LABEL,
          payload: label
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: LabelCreateTypes.LABELCREATE_CREATION_FAILED,
          payload: err
        });
        reject();
      });
  });
};

export const editLabelinLibrary = (
  id: string,
  label: ICreateLabel
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: LabelCreateTypes.Actions | LabelLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;

  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  labelConsumer.setPath(`/tradinglabel/${currentTradingMap._id}/label`);

  return new Promise((resolve, reject) => {
    labelConsumer
      .editDocument({ _id: id, ...label } as ILabel)
      .then(Label => {
        // Reset Label Dialog Form Fields
        dispatch({
          type: LabelCreateTypes.LABELCREATE_RESET_FORM
        });

        // Add Label to Library
        dispatch({
          type: LabelLibraryTypes.LABELLIBRARY_EDIT_LABEL,
          payload: Label
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: LabelCreateTypes.LABELCREATE_CREATION_FAILED,
          payload: err
        });
        reject();
      });
  });
};

export const removeLabelfromLibrary = (
  labelid: string
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: LabelLibraryTypes.Actions | LabelCurrentTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;

  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  labelConsumer.setPath(`/tradinglabel/${currentTradingMap._id}/label`);

  const currentLabel = getState().labels.current.label;

  return new Promise((resolve, reject) => {
    labelConsumer
      .removeDocument(labelid)
      .then(_label => {
        // Remove Label from Library
        dispatch({
          type: LabelLibraryTypes.LABELLIBRARY_REMOVE_LABEL,
          payload: labelid
        });

        // If label being removed is current label, clear current label
        if (currentLabel && labelid === currentLabel._id) {
          dispatch({
            type: LabelCurrentTypes.LABELCURRENT_CLEAR_LABEL
          });
        }

        //TODO Popup that confirms deletion, but allows undo for x seconds

        resolve();
      })
      .catch(err => {
        console.log(err);
        //TODO Popup that says Label Removed Failed
        reject();
      });
  });
};
