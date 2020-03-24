import * as LabelEditorTypes from "../types/editor.types";

export function openEditorLabelDialog(): LabelEditorTypes.Actions {
  return {
    type: LabelEditorTypes.LABELEDITOR_SET_DIALOG,
    payload: true
  };
}

export function closeLabelDialog(): LabelEditorTypes.Actions {
  return {
    type: LabelEditorTypes.LABELEDITOR_SET_DIALOG,
    payload: false
  };
}
