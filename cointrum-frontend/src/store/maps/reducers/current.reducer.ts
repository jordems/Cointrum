import * as MapCurrentTypes from "./../types/current.types";

const initialState: MapCurrentTypes.State = {
  map: {
    _id: "testid",
    name: "My Test Map",
    desc: "Desc of My Test Map",
    exchange: "Binance",
    basecurrency: "BNB",
    altcurrency: "BTC"
  }
};

export function currentReducer(
  state: MapCurrentTypes.State = initialState,
  action: MapCurrentTypes.Actions
) {
  switch (action.type) {
    case MapCurrentTypes.MAPCURRENT_SET_MAP:
      return {
        ...state,
        map: action.payload
      };
    case MapCurrentTypes.MAPCURRENT_EDIT_MAP:
      return {
        ...state,
        map: action.payload
      };

    default:
      return state;
  }
}
