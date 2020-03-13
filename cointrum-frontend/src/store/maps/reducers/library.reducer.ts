import { omit } from "lodash";

import * as MapLibraryTypes from "./../types/library.types";

const initialState: MapLibraryTypes.State = {
  maps: {},
  loadingMaps: true
};

export function libraryReducer(
  state: MapLibraryTypes.State = initialState,
  action: MapLibraryTypes.Actions
) {
  switch (action.type) {
    case MapLibraryTypes.MAPLIBRARY_FETCH_MAPS:
      return {
        ...state,
        maps: action.payload,
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
    case MapLibraryTypes.MAPLIBRARY_REMOVE_MAP:
      return {
        ...state,
        maps: { ...omit(state.maps, action.payload) }
      };
    default:
      return state;
  }
}
