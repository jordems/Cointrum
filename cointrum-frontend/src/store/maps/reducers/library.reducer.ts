import { omit } from "lodash";

import * as MapLibraryTypes from "./../types/library.types";

const initialState: MapLibraryTypes.State = {
  maps: {},
  error: undefined,
  loadingMaps: true
};

export function libraryReducer(
  state: MapLibraryTypes.State = initialState,
  action: MapLibraryTypes.Actions
): MapLibraryTypes.State {
  switch (action.type) {
    case MapLibraryTypes.MAPLIBRARY_FETCH_MAPS_SUCCESS:
      return {
        ...state,
        maps: action.payload,
        error: undefined,
        loadingMaps: false
      };
    case MapLibraryTypes.MAPLIBRARY_FETCH_MAPS_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingMaps: false
      };
    case MapLibraryTypes.MAPLIBRARY_ADD_MAP:
      return {
        ...state,
        maps: {
          ...state.maps,
          [action.payload._id]: action.payload
        }
      };
    case MapLibraryTypes.MAPLIBRARY_EDIT_MAP:
      return {
        ...state,
        maps: {
          ...state.maps,
          [action.payload._id]: action.payload
        }
      };
    case MapLibraryTypes.MAPLIBRARY_REMOVE_MAP:
      return {
        ...state,
        maps: { ...omit(state.maps, action.payload) }
      };
    default:
      return state;
  }
}
