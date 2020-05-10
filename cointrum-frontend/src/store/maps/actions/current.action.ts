import * as MapCurrentTypes from "./../types/current.types";
import { ITradingMap } from "models";
import { clearPHDS } from "store/phds/actions/library.action";

import * as PHDSLibraryTypes from "store/phds/types/library.types";

export const setCurrentMap = (map: ITradingMap) => (
  dispatch: (e: MapCurrentTypes.Actions | PHDSLibraryTypes.Actions) => void
): void => {
  // Clear Current PHDS When Swapping Maps
  dispatch(clearPHDS());

  dispatch({
    type: MapCurrentTypes.MAPCURRENT_SET_MAP,
    payload: map,
  });
};
