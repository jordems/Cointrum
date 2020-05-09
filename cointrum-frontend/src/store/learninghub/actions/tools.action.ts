import { uuid } from "uuidv4";

import * as LHToolsTypes from "../types/tools.types";
import { ICreateSeed, IPHDSElement } from "models";
import { AppState } from "store";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { IOHLCData } from "shared-components/charts/lib/IOHLCData";
import { addSeedtoLabelUL } from "store/learninghub/_seeds/actions/editor.action";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

export const changeSeedTool = (seedtool: LHToolsTypes.LearningHubTools) => (
  dispatch: (e: LHToolsTypes.Actions) => void
): void => {
  dispatch({
    type: LHToolsTypes.LEARNINGHUB_CHANGE_SEEDTOOL,
    payload: seedtool,
  });
};

export const handleSelection = (data: IOHLCData) => (
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
