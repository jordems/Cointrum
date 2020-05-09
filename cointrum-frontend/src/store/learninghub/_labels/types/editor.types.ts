export interface State {
  dialogOpen: boolean;
}

export const LABELEDITOR_SET_DIALOG = "LABELEDITOR_SET_DIALOG";

interface LabelEditorSetDialog {
  type: typeof LABELEDITOR_SET_DIALOG;
  payload: boolean;
}

export type Actions = LabelEditorSetDialog;
