import { ICreateSeed } from "models";
import { IError } from "services/api/ErrorTypes";
import { IOHLCData } from "shared-components/charts/lib/IOHLCData";

export interface State {
  // UnLearned seedsbySeed
  ulseedsbyLabel: {
    [labelid: string]: { [tempseedid: string]: ICreateSeed };
  };
  error?: IError;
  learning: boolean;
  seedtool: "SEEDSELECT" | "VIEW" | "TEST";
  selection: {
    start?: IOHLCData;
    end?: IOHLCData;
  };
}

export const SEEDEDITOR_ADD_SEED_TO_LABEL = "SEEDEDITOR_ADD_SEED_TO_LABEL";
export const SEEDEDITOR_EDIT_SEED = "SEEDEDITOR_EDIT_SEED";
export const SEEDEDITOR_REMOVE_SEED_TO_LABEL =
  "SEEDEDITOR_REMOVE_SEED_TO_LABEL";
export const SEEDEDITOR_CLEAR_SEEDS = "SEEDEDITOR_CLEAR_SEEDS";

export const SEEDEDITOR_LEARN_ATTEMPT = "SEEDEDITOR_LEARN_ATTEMPT";
export const SEEDEDITOR_LEARN_SUCCESS = "SEEDEDITOR_LEARN_SUCCESS";
export const SEEDEDITOR_LEARN_FAIL = "SEEDEDITOR_LEARN_FAIL";

export const SEEDEDITOR_CHANGE_SEEDTOOL = "SEEDEDITOR_CHANGE_SEEDTOOL";

export const SEEDEDITOR_CHANGE_SELECTION = "SEEDEDITOR_CHANGE_SELECTION";
export const SEEDEDITOR_CLEAR_SELECTION = "SEEDEDITOR_CLEAR_SELECTION";

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

interface SeedEditorClearSeeds {
  type: typeof SEEDEDITOR_CLEAR_SEEDS;
}

interface SeedEditorLearnAttempt {
  type: typeof SEEDEDITOR_LEARN_ATTEMPT;
}
interface SeedEditorLearnSuccess {
  type: typeof SEEDEDITOR_LEARN_SUCCESS;
}
interface SeedEditorLearnFail {
  type: typeof SEEDEDITOR_LEARN_FAIL;
  payload: IError;
}

interface SeedEditorChangeSeedTool {
  type: typeof SEEDEDITOR_CHANGE_SEEDTOOL;
  payload: "SEEDSELECT" | "VIEW" | "TEST";
}

interface SeedEditorChangeSelection {
  type: typeof SEEDEDITOR_CHANGE_SELECTION;
  payload: {
    frame: "start" | "end";
    data: IOHLCData;
  };
}
interface SeedEditorClearSelection {
  type: typeof SEEDEDITOR_CLEAR_SELECTION;
}

export type Actions =
  | SeedEditorAddSeedToLabel
  | SeedEditorEditSeed
  | SeedEditorRemoveSeedFromLabel
  | SeedEditorClearSeeds
  | SeedEditorLearnAttempt
  | SeedEditorLearnSuccess
  | SeedEditorLearnFail
  | SeedEditorChangeSeedTool
  | SeedEditorChangeSelection
  | SeedEditorClearSelection;
