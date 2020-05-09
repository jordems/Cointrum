import { omit } from "lodash";

import * as BuySellLibraryTypes from "./../types/library.types";

const initialState: BuySellLibraryTypes.State = {
  buysell: {},
  error: undefined,
  loading: true,
};

export function libraryReducer(
  state: BuySellLibraryTypes.State = initialState,
  action: BuySellLibraryTypes.Actions
): BuySellLibraryTypes.State {
  switch (action.type) {
    case BuySellLibraryTypes.BUYSELLLIBRARY_FETCH_TUPLES_SUCCESS:
      return {
        ...state,
        buysell: action.payload,
        error: undefined,
        loading: false,
      };
    case BuySellLibraryTypes.BUYSELLLIBRARY_FETCH_TUPLES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case BuySellLibraryTypes.BUYSELLLIBRARY_ADD_TUPLE:
      return {
        ...state,
        buysell: {
          ...state.buysell,
          [action.payload._id]: action.payload,
        },
      };
    case BuySellLibraryTypes.BUYSELLLIBRARY_EDIT_TUPLE:
      return {
        ...state,
        buysell: {
          ...state.buysell,
          [action.payload._id]: action.payload,
        },
      };
    case BuySellLibraryTypes.BUYSELLLIBRARY_REMOVE_TUPLE:
      return {
        ...state,
        buysell: { ...omit(state.buysell, action.payload._id) },
      };
    default:
      return state;
  }
}
