import * as MapCurrentTypes from "./../types/current.types";

const initialState: MapCurrentTypes.State = {
  map: null
};

export function currentReducer(
  state: MapCurrentTypes.State = initialState,
  action: MapCurrentTypes.Actions
): MapCurrentTypes.State {
  switch (action.type) {
    case MapCurrentTypes.MAPCURRENT_SET_MAP:
      return {
        ...state,
        map: action.payload
      };

    case MapCurrentTypes.MAPCURRENT_CLEAR_MAP:
      return {
        ...state,
        map: null
      };

    default:
      return state;
  }
}
