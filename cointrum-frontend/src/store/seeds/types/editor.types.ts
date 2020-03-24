import { ICreateSeed } from "models";

export interface State {
  // UnLearned seedsbySeed
  ulseedsbyLabel: {
    [labelid: string]: { [tempseedid: string]: ICreateSeed };
  };
}

export const SEEDEDITOR_ADD_SEED_TO_LABEL = "SEEDEDITOR_ADD_SEED_TO_LABEL";
export const SEEDEDITOR_EDIT_SEED = "SEEDEDITOR_EDIT_SEED";
export const SEEDEDITOR_REMOVE_SEED_TO_LABEL =
  "SEEDEDITOR_REMOVE_SEED_TO_LABEL";

interface SeedEditorAddSeedToLabel {
  type: typeof SEEDEDITOR_ADD_SEED_TO_LABEL;
  payload: {
    labelid: string;
    seed: ICreateSeed;
  };
}
interface SeedEditorEditSeed {
  type: typeof SEEDEDITOR_EDIT_SEED;
  payload: {
    labelid: string;
    seed: ICreateSeed;
  };
}
interface SeedEditorRemoveSeedFromLabel {
  type: typeof SEEDEDITOR_REMOVE_SEED_TO_LABEL;
  payload: {
    labelid: string;
    seedid: string;
  };
}

export type Actions =
  | SeedEditorAddSeedToLabel
  | SeedEditorEditSeed
  | SeedEditorRemoveSeedFromLabel;
