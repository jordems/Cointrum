import { uuid } from "uuidv4";

import * as LHToolsTypes from "../types/tools.types";
import { ICreateSeed, IPHDSElement, ICreateBuySell } from "models";
import { AppState } from "store";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { IOHLCData } from "shared-components/charts/lib/IOHLCData";
import {
  addSeedtoLabelUL,
  learnSeeds,
} from "store/learninghub/_seeds/actions/editor.action";
import {
  addBuySellUL,
  learnTuples,
} from "store/learninghub/_buysell/actions/editor.action";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

export const changeTool = (tool: LHToolsTypes.LearningHubTools) => (
  dispatch: (e: LHToolsTypes.Actions) => void
): void => {
  dispatch({
    type: LHToolsTypes.LEARNINGHUB_CHANGE_SEEDTOOL,
    payload: tool,
  });
};

export const handleChartSelection = (data: IOHLCData) => (
  dispatch: (e: LHToolsTypes.Actions | MyThunkResult<void>) => void,
  getState: () => AppState
): void => {
  const { currenttool } = getState().learninghub.tools;

  switch (currenttool) {
    case "BUYSELL":
      dispatch(handleBuySellSelection(data));
      break;
    case "SEEDSELECT":
      dispatch(handleSeedSelection(data));
      break;
    case "TEST":
      alert("Unimplmented Feature");
      break;
  }
};

export const handleBuySellSelection = (data: IOHLCData) => (
  dispatch: (e: LHToolsTypes.Actions | MyThunkResult<void>) => void,
  getState: () => AppState
): void => {
  const { selection } = getState().learninghub.buysell.current;

  const newTuple: ICreateBuySell = {
    tempid: uuid(),
    type: selection,
    openTime: data.openTime,
  };

  dispatch(addBuySellUL(newTuple));
};

export const handleSeedSelection = (data: IOHLCData) => (
  dispatch: (e: LHToolsTypes.Actions | MyThunkResult<void>) => void,
  getState: () => AppState
): void => {
  const { selection } = getState().learninghub.tools;

  if (!selection.start) {
    dispatch({
      type: LHToolsTypes.LEARNINGHUB_CHANGE_SELECTION,
      payload: {
        frame: "start",
        data,
      },
    });
  } else if (!selection.end) {
    dispatch({
      type: LHToolsTypes.LEARNINGHUB_CHANGE_SELECTION,
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
      type: LHToolsTypes.LEARNINGHUB_CLEAR_SELECTION,
    });
  }
};

export const handleLearn = () => (
  dispatch: (e: LHToolsTypes.Actions | MyThunkResult<void>) => void,
  getState: () => AppState
): void => {
  dispatch(learnTuples());
  dispatch(learnSeeds());
};
