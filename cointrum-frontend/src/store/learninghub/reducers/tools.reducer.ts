import * as LHToolsTypes from "../types/tools.types";

const initialState: LHToolsTypes.State = {
  seedtool: "SEEDSELECT",
  selection: {},
};

export function toolsReducer(
  state: LHToolsTypes.State = initialState,
  action: LHToolsTypes.Actions
): LHToolsTypes.State {
  switch (action.type) {
    case LHToolsTypes.LEARNINGHUB_CHANGE_SEEDTOOL:
      return {
        ...state,
        seedtool: action.payload,
      };
    case LHToolsTypes.LEARNINGHUB_CHANGE_SELECTION:
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.payload.frame]: action.payload.data,
        },
      };
    case LHToolsTypes.LEARNINGHUB_CLEAR_SELECTION:
      return {
        ...state,
        selection: {},
      };
    default:
      return state;
  }
}
