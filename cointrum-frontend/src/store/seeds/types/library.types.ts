import { ISeed } from "models";
import { IError } from "services/api/ErrorTypes";

export interface State {
  seedsbyLabel: {
    [labelid: string]: { [seedid: string]: ISeed };
  };
  error?: IError;
  loading: boolean;
}

export const SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_SUCCESS =
  "SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_SUCCESS";
export const SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_FAIL =
  "SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_FAIL";

export const SEEDLIBRARY_ADD_SEEDS_TO_LABEL = "SEEDLIBRARY_ADD_SEEDS_TO_LABEL";
export const SEEDLIBRARY_EDIT_SEED = "SEEDLIBRARY_EDIT_SEED";
export const SEEDLIBRARY_REMOVE_SEED_FROM_LABEL =
  "SEEDLIBRARY_REMOVE_SEED_FROM_LABEL";

interface SeedLibraryFetchSeedsForLabelSuccess {
  type: typeof SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_SUCCESS;
  payload: {
    labelid: string;
    seeds: {
      [seedid: string]: ISeed;
    };
  };
}

interface SeedLibraryFetchSeedsForLabelFail {
  type: typeof SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_FAIL;
  payload: IError;
}

interface SeedLibraryAddSeedstoLabel {
  type: typeof SEEDLIBRARY_ADD_SEEDS_TO_LABEL;
  payload: {
    labelid: string;
    seeds: {
      [seedid: string]: ISeed;
    };
  };
}
interface SeedLibraryEditSeed {
  type: typeof SEEDLIBRARY_EDIT_SEED;
  payload: {
    labelid: string;
    seed: ISeed;
  };
}
interface SeedLibraryRemoveSeedFromLabel {
  type: typeof SEEDLIBRARY_REMOVE_SEED_FROM_LABEL;
  payload: {
    labelid: string;
    seedid: string;
  };
}

export type Actions =
  | SeedLibraryFetchSeedsForLabelSuccess
  | SeedLibraryFetchSeedsForLabelFail
  | SeedLibraryAddSeedstoLabel
  | SeedLibraryEditSeed
  | SeedLibraryRemoveSeedFromLabel;
