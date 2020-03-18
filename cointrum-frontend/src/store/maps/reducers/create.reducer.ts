import * as MapCreateTypes from "./../types/create.types";

const initialState: MapCreateTypes.State = {
  form: {
    name: "",
    desc: "",
    exchange: "Binance",
    basecurrency: "BNB",
    altcurrency: "BTC",
    cycleduration: "1m"
  },
  dialogOpen: false,
  editing: "",
  error: undefined
};

export function createReducer(
  state: MapCreateTypes.State = initialState,
  action: MapCreateTypes.Actions
): MapCreateTypes.State {
  switch (action.type) {
    case MapCreateTypes.MAPCREATE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value
        }
      };
    case MapCreateTypes.MAPCREATE_RESET_FORM:
      return {
        ...state,
        form: initialState.form
      };
    case MapCreateTypes.MAPCREATE_CREATION_FAILED:
      return {
        ...state,
        error: action.payload
      };
    case MapCreateTypes.MAPCREATE_SET_DIALOG:
      if (action.payload.create !== undefined) {
        return {
          ...state,
          dialogOpen: action.payload.create,
          editing: undefined
        };
      } else if (
        action.payload.edit !== undefined &&
        action.payload.map !== undefined
      ) {
        return {
          ...state,
          dialogOpen: action.payload.edit,
          editing: action.payload.map._id,
          form: {
            ...action.payload.map
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
