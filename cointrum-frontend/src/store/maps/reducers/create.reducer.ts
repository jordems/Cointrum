import * as MapCreateTypes from "./../types/create.types";

const initialState: MapCreateTypes.State = {
  form: {
    name: "",
    desc: "",
    exchange: "Binance",
    basecurrency: "BNB",
    altcurrency: "BTC"
  }
};

export function createReducer(
  state: MapCreateTypes.State = initialState,
  action: MapCreateTypes.Actions
) {
  switch (action.type) {
    case MapCreateTypes.MAPCREATE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value
        }
      };

    default:
      return state;
  }
}
