import { omit } from "lodash";

import * as BuySellTypes from "../types/editor.types";

const initialState: BuySellTypes.State = {
  ulbuysell: {},
  learning: false,
  error: undefined,
};

export function editorReducer(
  state: BuySellTypes.State = initialState,
  action: BuySellTypes.Actions
): BuySellTypes.State {
  switch (action.type) {
    case BuySellTypes.BUYSELLEDITOR_ADD_TUPLE:
      return {
        ...state,
        ulbuysell: {
          ...state.ulbuysell,
          [action.payload._id]: action.payload,
        },
      };
    case BuySellTypes.BUYSELLEDITOR_EDIT_TUPLE:
      return {
        ...state,
        ulbuysell: {
          ...state.ulbuysell,
          [action.payload._id]: action.payload,
        },
      };
    case BuySellTypes.BUYSELLEDITOR_REMOVE_TUPLE:
      return {
        ...state,
        ulbuysell: { ...omit(state.ulbuysell, action.payload._id) },
      };
    case BuySellTypes.BUYSELLEDITOR_CLEAR_TUPLES:
      return {
        ...state,
        ulbuysell: {},
      };
    case BuySellTypes.BUYSELLEDITOR_LEARN_ATTEMPT:
      return {
        ...state,
        learning: true,
      };
    case BuySellTypes.BUYSELLEDITOR_LEARN_SUCCESS:
      return {
        ...state,
        ulbuysell: {},
        learning: false,
      };
    case BuySellTypes.BUYSELLEDITOR_LEARN_FAIL:
      return {
        ...state,
        learning: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
