import { omit } from "lodash";

import * as SeedEditorTypes from "./../types/editor.types";

const initialState: SeedEditorTypes.State = {
  ulseedsbyLabel: {}
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
            [action.payload.seed.tempid]: action.payload.seed
          }
        }
      };
    case SeedEditorTypes.SEEDEDITOR_EDIT_SEED:
      return {
        ...state,
        ulseedsbyLabel: {
          ...state.ulseedsbyLabel,
          [action.payload.labelid]: {
            ...state.ulseedsbyLabel[action.payload.labelid],
            [action.payload.seed.tempid]: action.payload.seed
          }
        }
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
            )
          }
        }
      };

    default:
      return state;
  }
}
