import * as LabelEditorTypes from "./../types/editor.types";

const initialState: LabelEditorTypes.State = {
  dialogOpen: false
};

export function editorReducer(
  state: LabelEditorTypes.State = initialState,
  action: LabelEditorTypes.Actions
): LabelEditorTypes.State {
  switch (action.type) {
    case LabelEditorTypes.LABELEDITOR_SET_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload
      };

    default:
      return state;
  }
}
