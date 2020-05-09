import * as BuySellCurrentTypes from "./../types/current.types";

const initialState: BuySellCurrentTypes.State = {
  selection: "BUY",
};

export function currentReducer(
  state: BuySellCurrentTypes.State = initialState,
  action: BuySellCurrentTypes.Actions
): BuySellCurrentTypes.State {
  switch (action.type) {
    case BuySellCurrentTypes.BUYSELLCURRENT_SET_STATE:
      return {
        ...state,
        selection: action.payload,
      };

    default:
      return state;
  }
}
