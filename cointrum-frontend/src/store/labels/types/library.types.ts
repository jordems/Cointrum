import { ILabel } from "models";
import { IError } from "services/api/ErrorTypes";

export interface State {
  labels: {
    [labelid: number]: ILabel;
  };
  error?: IError;
  loadingLabels: boolean;
}

export const LABELLIBRARY_FETCH_LABELS_SUCCESS =
  "LABELLIBRARY_FETCH_LABELS_SUCCESS";
export const LABELLIBRARY_FETCH_LABELS_FAIL = "LABELLIBRARY_FETCH_LABELS_FAIL";

export const LABELLIBRARY_ADD_LABEL = "LABELLIBRARY_ADD_LABEL";
export const LABELLIBRARY_EDIT_LABEL = "LABELLIBRARY_EDIT_LABEL";
export const LABELLIBRARY_REMOVE_LABEL = "LABELLIBRARY_REMOVE_LABEL";

interface LabelLibraryFetchLabelsSuccess {
  type: typeof LABELLIBRARY_FETCH_LABELS_SUCCESS;
  payload: {
    [labelid: string]: ILabel;
  };
}

interface LabelLibraryFetchLabelsFail {
  type: typeof LABELLIBRARY_FETCH_LABELS_FAIL;
  payload: IError;
}

interface LabelLibraryAddLabel {
  type: typeof LABELLIBRARY_ADD_LABEL;
  payload: ILabel;
}
interface LabelLibraryEditLabel {
  type: typeof LABELLIBRARY_EDIT_LABEL;
  payload: ILabel;
}
interface LabelLibraryRemoveLabel {
  type: typeof LABELLIBRARY_REMOVE_LABEL;
  payload: string;
}

export type Actions =
  | LabelLibraryFetchLabelsSuccess
  | LabelLibraryFetchLabelsFail
  | LabelLibraryAddLabel
  | LabelLibraryEditLabel
  | LabelLibraryRemoveLabel;
