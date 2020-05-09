import { IError } from "services/api/ErrorTypes";
import { ILabel, ICreateLabel } from "models";

export interface State {
  form: ICreateLabel;
  dialogOpen: boolean;
  editing?: string; // LabelID
  error?: IError;
}

export const LABELCREATE_UPDATE = "LABELCREATE_UPDATE";
export const LABELCREATE_RESET_FORM = "LABELCREATE_RESET_FORM";
export const LABELCREATE_CREATION_FAILED = "LABELCREATE_CREATION_FAIL";
export const LABELCREATE_SET_DIALOG = "LABELCREATE_SET_DIALOG";

interface LabelUpdateFieldName {
  type: typeof LABELCREATE_UPDATE;
  payload: {
    field: "name";
    value: State["form"]["name"];
  };
}
interface LabelUpdateFieldDesc {
  type: typeof LABELCREATE_UPDATE;
  payload: {
    field: "desc";
    value: State["form"]["desc"];
  };
}
interface LabelUpdateFieldColour {
  type: typeof LABELCREATE_UPDATE;
  payload: {
    field: "colour";
    value: State["form"]["colour"];
  };
}

interface LabelResetForm {
  type: typeof LABELCREATE_RESET_FORM;
}

interface LabelCreationFailForm {
  type: typeof LABELCREATE_CREATION_FAILED;
  payload: IError;
}

interface LabelSetDialog {
  type: typeof LABELCREATE_SET_DIALOG;
  payload: {
    create?: boolean;
    edit?: boolean;
    label?: ILabel;
  };
}

export type Actions =
  | LabelUpdateFieldName
  | LabelUpdateFieldDesc
  | LabelUpdateFieldColour
  | LabelResetForm
  | LabelCreationFailForm
  | LabelSetDialog;
