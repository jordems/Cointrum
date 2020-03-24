import * as SeedEditorTypes from "../types/editor.types";
import { ICreateSeed } from "models";

export function addSeedtoLabelUL(
  labelid: string,
  seed: ICreateSeed
): SeedEditorTypes.Actions {
  return {
    type: SeedEditorTypes.SEEDEDITOR_ADD_SEED_TO_LABEL,
    payload: {
      labelid: labelid,
      seed
    }
  };
}

export function editSeedUL(
  labelid: string,
  seed: ICreateSeed
): SeedEditorTypes.Actions {
  return {
    type: SeedEditorTypes.SEEDEDITOR_EDIT_SEED,
    payload: {
      labelid: labelid,
      seed
    }
  };
}

export function removeSeedfromlabelUL(
  labelid: string,
  seedtempid: string
): SeedEditorTypes.Actions {
  return {
    type: SeedEditorTypes.SEEDEDITOR_REMOVE_SEED_TO_LABEL,
    payload: {
      labelid,
      seedid: seedtempid
    }
  };
}
