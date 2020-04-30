import { omit } from "lodash";

import * as SeedEditorTypes from "./../types/editor.types";

const initialState: SeedEditorTypes.State = {
  ulseedsbyLabel: {},
  learning: false,
  error: undefined,
  seedtool: "SEEDSELECT",
  selection: {},
};

export function editorReducer(
  state: SeedEditorTypes.State = initialState,
  action: SeedEditorTypes.Actions
): SeedEditorTypes.State {
  switch (action.type) {
    case SeedEditorTypes.SEEDEDITOR_ADD_SEED_TO_LABEL:
      return {
        ...state,
        ulseedsbyLabel: {
          ...state.ulseedsbyLabel,
          [action.payload.labelid]: {
            ...state.ulseedsbyLabel[action.payload.labelid],
            [action.payload.seed.tempid]: action.payload.seed,
          },
        },
      };
    case SeedEditorTypes.SEEDEDITOR_EDIT_SEED:
      return {
        ...state,
        ulseedsbyLabel: {
          ...state.ulseedsbyLabel,
          [action.payload.labelid]: {
            ...state.ulseedsbyLabel[action.payload.labelid],
            [action.payload.seed.tempid]: action.payload.seed,
          },
        },
      };
    case SeedEditorTypes.SEEDEDITOR_REMOVE_SEED_TO_LABEL:
      return {
        ...state,
        ulseedsbyLabel: {
          ...state.ulseedsbyLabel,
          [action.payload.labelid]: {
            ...omit(
              state.ulseedsbyLabel[action.payload.labelid],
              action.payload.seedid
            ),
          },
        },
      };
    case SeedEditorTypes.SEEDEDITOR_CLEAR_SEEDS:
      return {
        ...state,
        ulseedsbyLabel: {},
      };
    case SeedEditorTypes.SEEDEDITOR_LEARN_ATTEMPT:
      return {
        ...state,
        learning: true,
      };
    case SeedEditorTypes.SEEDEDITOR_LEARN_SUCCESS:
      return {
        ...state,
        ulseedsbyLabel: {},
        learning: false,
      };
    case SeedEditorTypes.SEEDEDITOR_LEARN_FAIL:
      return {
        ...state,
        learning: false,
        error: action.payload,
      };
    case SeedEditorTypes.SEEDEDITOR_CHANGE_SEEDTOOL:
      return {
        ...state,
        seedtool: action.payload,
      };
    case SeedEditorTypes.SEEDEDITOR_CHANGE_SELECTION:
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.payload.frame]: action.payload.data,
        },
      };
    case SeedEditorTypes.SEEDEDITOR_CLEAR_SELECTION:
      return {
        ...state,
        selection: {},
      };
    default:
      return state;
  }
}
