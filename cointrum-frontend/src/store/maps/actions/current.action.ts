import * as MapCurrentTypes from "./../types/current.types";
import { ITradingMap } from "./../types/ITradingMap";

export function setCurrentMap(map: ITradingMap): MapCurrentTypes.Actions {
  // /TODO Update DB TO say current selected map is this map. So if they reload then it still shows. (Or use cookies)

  return {
    type: MapCurrentTypes.MAPCURRENT_SET_MAP,
    payload: map
  };
}

export function editCurrentMap(newMap: ITradingMap): MapCurrentTypes.Actions {
  return {
    type: MapCurrentTypes.MAPCURRENT_EDIT_MAP,
    payload: newMap
  };
}
