import * as LabelCurrentTypes from "./../types/current.types";

const initialState: LabelCurrentTypes.State = {
  label: null
};

export function currentReducer(
  state: LabelCurrentTypes.State = initialState,
  action: LabelCurrentTypes.Actions
): LabelCurrentTypes.State {
  switch (action.type) {
    case LabelCurrentTypes.LABELCURRENT_SET_LABEL:
      return {
        ...state,
        label: action.payload
      };

    case LabelCurrentTypes.LABELCURRENT_CLEAR_LABEL:
      return {
        ...state,
        label: null
      };

    default:
      return state;
  }
}
