import * as SeedEditorTypes from "../types/editor.types";
import { ICreateSeed } from "models";
import { AppState } from "store";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

export const addSeedtoLabelUL = (seed: ICreateSeed) => (
  dispatch: (e: SeedEditorTypes.Actions) => void,
  getState: () => AppState
): void => {
  const selectedLabelID = getState().labels.current.label?._id;
  console.log("AddseedtoUL", selectedLabelID, seed);
  if (!selectedLabelID) {
    alert("Must select a label first");
    return;
  }

  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_ADD_SEED_TO_LABEL,
    payload: {
      labelid: selectedLabelID,
      seed
    }
  });
};

export const editSeedUL = (labelid: string, seed: ICreateSeed) => (
  dispatch: (e: SeedEditorTypes.Actions) => void
): void => {
  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_EDIT_SEED,
    payload: {
      labelid: labelid,
      seed
    }
  });
};

export const removeSeedfromlabelUL = (labelid: string, tempseedid: string) => (
  dispatch: (e: SeedEditorTypes.Actions) => void
): void => {
  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_REMOVE_SEED_TO_LABEL,
    payload: {
      labelid,
      seedid: tempseedid
    }
  });
};

export const learnSeeds = (): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: SeedEditorTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const editorSeeds = getState().seeds.editor.ulseedsbyLabel;

  return new Promise((resolve, reject) => {
    //TODO Place all editor seeds in db, then add seeds to redux Library
  });
};
