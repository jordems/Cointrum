import * as LabelCreateTypes from "./../types/create.types";

const initialState: LabelCreateTypes.State = {
  form: {
    name: "",
    desc: "",
    colour: "#FFFFFF"
  },
  dialogOpen: false,
  editing: "",
  error: undefined
};

export function createReducer(
  state: LabelCreateTypes.State = initialState,
  action: LabelCreateTypes.Actions
): LabelCreateTypes.State {
  switch (action.type) {
    case LabelCreateTypes.LABELCREATE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value
        }
      };
    case LabelCreateTypes.LABELCREATE_RESET_FORM:
      return {
        ...state,
        form: initialState.form
      };
    case LabelCreateTypes.LABELCREATE_CREATION_FAILED:
      return {
        ...state,
        error: action.payload
      };
    case LabelCreateTypes.LABELCREATE_SET_DIALOG:
      if (action.payload.create !== undefined) {
        return {
          ...state,
          dialogOpen: action.payload.create,
          editing: undefined
        };
      } else if (
        action.payload.edit !== undefined &&
        action.payload.label !== undefined
      ) {
        return {
          ...state,
          dialogOpen: action.payload.edit,
          editing: action.payload.label._id,
          form: {
            ...action.payload.label
          }
        };
      } else {
        return {
          ...state,
          dialogOpen: false,
          editing: undefined,
          form: initialState.form
        };
      }

    default:
      return state;
  }
}
