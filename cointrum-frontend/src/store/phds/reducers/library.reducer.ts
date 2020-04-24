import { cloneDeep } from "lodash";

import * as PHDSLibraryTypes from "./../types/library.types";
import { IPHDSElement } from "models";

const initialState: PHDSLibraryTypes.State = {
  phdselements: {},
  error: undefined,
  loading: false,
};

export function libraryReducer(
  state: PHDSLibraryTypes.State = initialState,
  action: PHDSLibraryTypes.Actions
): PHDSLibraryTypes.State {
  switch (action.type) {
    case PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_SUCCESS:
      return {
        ...state,
        phdselements: addElements(action.payload, state.phdselements),
        error: undefined,
        loading: false,
      };
    case PHDSLibraryTypes.PHDSLIBRARY_FETCH_ELEMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

function addElements(
  newelements: IPHDSElement[],
  phdselements: PHDSLibraryTypes.State["phdselements"]
): PHDSLibraryTypes.State["phdselements"] {
  const newphdselements = cloneDeep(phdselements);

  for (const ele of newelements) {
    newphdselements[ele._id] = ele;
  }
  return newphdselements;
}
