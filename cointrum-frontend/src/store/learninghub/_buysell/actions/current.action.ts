import * as BuySellCurrentTypes from "./../types/current.types";

export function setCurrentLabel(
  state: BuySellCurrentTypes.BuySellButtonStates
): BuySellCurrentTypes.Actions {
  return {
    type: BuySellCurrentTypes.BUYSELLCURRENT_SET_STATE,
    payload: state,
  };
}
