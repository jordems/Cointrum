import * as MapCurrentTypes from "./../types/current.types";
import { ITradingMap } from "models";

export function setCurrentMap(map: ITradingMap): MapCurrentTypes.Actions {
  // /TODO Update DB TO say current selected map is this map. So if they reload then it still shows. (Or use cookies)
  return {
    type: MapCurrentTypes.MAPCURRENT_SET_MAP,
    payload: map
  };
}
