import { uuid } from "uuidv4";

import * as SeedEditorTypes from "../types/editor.types";
import * as SeedLibraryTypes from "../types/library.types";
import { ICreateSeed, ISeed, IPHDSElement } from "models";
import { AppState } from "store";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import GenericRestfulAPIConsumer from "services/api/GenericRestfulAPIConsumer";
import { IOHLCData } from "shared-components/charts/lib/IOHLCData";

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
      seed,
    },
  });
};

export const editSeedUL = (labelid: string, seed: ICreateSeed) => (
  dispatch: (e: SeedEditorTypes.Actions) => void
): void => {
  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_EDIT_SEED,
    payload: {
      labelid: labelid,
      seed,
    },
  });
};

export const removeSeedfromlabelUL = (labelid: string, tempseedid: string) => (
  dispatch: (e: SeedEditorTypes.Actions) => void
): void => {
  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_REMOVE_SEED_TO_LABEL,
    payload: {
      labelid,
      seedid: tempseedid,
    },
  });
};

export const clearSeedsUL = () => (
  dispatch: (e: SeedEditorTypes.Actions) => void
): void => {
  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_CLEAR_SEEDS,
  });
};

export const learnSeeds = (): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: SeedEditorTypes.Actions | SeedLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_LEARN_ATTEMPT,
  });
  const ctradingMap = getState().maps.current.map;
  const editorSeeds = getState().seeds.editor.ulseedsbyLabel;
  const seedConsumer = new GenericRestfulAPIConsumer<ISeed, ICreateSeed>(
    `/tradingmap/$temp/label/$temp/seed`
  );
  return new Promise((resolve, reject) => {
    if (!ctradingMap) {
      reject();
      return;
    }

    let seedInsertPromises: Promise<ISeed>[] = [];
    Object.keys(editorSeeds).forEach((labelID) => {
      Object.keys(editorSeeds[labelID]).forEach((tempseedID) => {
        seedConsumer.setPath(
          `/tradingmap/${ctradingMap._id}/label/${labelID}/seed`
        );
        seedInsertPromises.push(
          seedConsumer.createDocument(editorSeeds[labelID][tempseedID])
        );
      });
    });

    Promise.all(seedInsertPromises)
      .then((learnedSeeds) => {
        dispatch({
          type: SeedLibraryTypes.SEEDLIBRARY_ADD_SEEDS,
          payload: learnedSeeds,
        });
        dispatch({
          type: SeedEditorTypes.SEEDEDITOR_LEARN_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SeedEditorTypes.SEEDEDITOR_LEARN_FAIL,
          payload: err,
        });
      });
  });
};

export const changeSeedTool = (seedtool: "SEEDSELECT" | "VIEW" | "TEST") => (
  dispatch: (e: SeedEditorTypes.Actions) => void
): void => {
  dispatch({
    type: SeedEditorTypes.SEEDEDITOR_CHANGE_SEEDTOOL,
    payload: seedtool,
  });
};

export const handleSelection = (data: IOHLCData) => (
  dispatch: (e: SeedEditorTypes.Actions | MyThunkResult<void>) => void,
  getState: () => AppState
): void => {
  const { selection } = getState().seeds.editor;

  if (!selection.start) {
    dispatch({
      type: SeedEditorTypes.SEEDEDITOR_CHANGE_SELECTION,
      payload: {
        frame: "start",
        data,
      },
    });
  } else if (!selection.end) {
    dispatch({
      type: SeedEditorTypes.SEEDEDITOR_CHANGE_SELECTION,
      payload: {
        frame: "end",
        data,
      },
    });

    const { phdselements } = getState().phds.library;

    // Currently When `end` frame is added we automatically add the seed to ulseedsbylabel
    let seedData: IPHDSElement[] = [];
    for (const ele of Object.values(phdselements)) {
      const eleTime = new Date(ele.openTime);

      // If User Selects Endtime first, swap start and end time
      const startTime =
        selection.start.date < data.date ? selection.start.date : data.date;
      const endTime =
        selection.start.date < data.date ? data.date : selection.start.date;

      if (startTime <= eleTime && endTime >= eleTime) {
        seedData.push(ele);
      }
    }

    const newSeed: ICreateSeed = {
      tempid: uuid(),
      data: seedData,
    };

    dispatch(addSeedtoLabelUL(newSeed));
    dispatch({
      type: SeedEditorTypes.SEEDEDITOR_CLEAR_SELECTION,
    });
  }
};
