import { omit } from "lodash";

import * as SeedLibraryTypes from "./../types/library.types";

const initialState: SeedLibraryTypes.State = {
  seedsbyLabel: {},
  error: undefined,
  loading: true
};

export function libraryReducer(
  state: SeedLibraryTypes.State = initialState,
  action: SeedLibraryTypes.Actions
): SeedLibraryTypes.State {
  switch (action.type) {
    case SeedLibraryTypes.SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_SUCCESS:
      return {
        ...state,
        seedsbyLabel: {
          ...state.seedsbyLabel,
          [action.payload.labelid]: {
            ...state.seedsbyLabel[action.payload.labelid],
            ...action.payload.seeds
          }
        },
        error: undefined,
        loading: false
      };
    case SeedLibraryTypes.SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SeedLibraryTypes.SEEDLIBRARY_ADD_SEEDS_TO_LABEL:
      return {
        ...state,
        seedsbyLabel: {
          ...state.seedsbyLabel,
          [action.payload.labelid]: {
            ...state.seedsbyLabel[action.payload.labelid],
            ...action.payload.seeds
          }
        }
      };
    case SeedLibraryTypes.SEEDLIBRARY_EDIT_SEED:
      return {
        ...state,
        seedsbyLabel: {
          ...state.seedsbyLabel,
          [action.payload.labelid]: {
            ...state.seedsbyLabel[action.payload.labelid],
            [action.payload.seed._id]: action.payload.seed
          }
        }
      };
    case SeedLibraryTypes.SEEDLIBRARY_REMOVE_SEED_FROM_LABEL:
      return {
        ...state,
        seedsbyLabel: {
          ...state.seedsbyLabel,
          [action.payload.labelid]: {
            ...omit(
              state.seedsbyLabel[action.payload.labelid],
              action.payload.seedid
            )
          }
        }
      };
    default:
      return state;
  }
}
