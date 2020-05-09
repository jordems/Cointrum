import { omit } from "lodash";

import * as LabelLibraryTypes from "./../types/library.types";

const initialState: LabelLibraryTypes.State = {
  labels: {},
  error: undefined,
  loadingLabels: true
};

export function libraryReducer(
  state: LabelLibraryTypes.State = initialState,
  action: LabelLibraryTypes.Actions
): LabelLibraryTypes.State {
  switch (action.type) {
    case LabelLibraryTypes.LABELLIBRARY_FETCH_LABELS_SUCCESS:
      return {
        ...state,
        labels: action.payload,
        error: undefined,
        loadingLabels: false
      };
    case LabelLibraryTypes.LABELLIBRARY_FETCH_LABELS_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingLabels: false
      };
    case LabelLibraryTypes.LABELLIBRARY_ADD_LABEL:
      return {
        ...state,
        labels: {
          ...state.labels,
          [action.payload._id]: action.payload
        }
      };
    case LabelLibraryTypes.LABELLIBRARY_EDIT_LABEL:
      return {
        ...state,
        labels: {
          ...state.labels,
          [action.payload._id]: action.payload
        }
      };
    case LabelLibraryTypes.LABELLIBRARY_REMOVE_LABEL:
      return {
        ...state,
        labels: { ...omit(state.labels, action.payload) }
      };
    default:
      return state;
  }
}
