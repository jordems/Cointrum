import * as LabelCurrentTypes from "./../types/current.types";
import { ILabel } from "models";

export function setCurrentLabel(label: ILabel): LabelCurrentTypes.Actions {
  // /TODO Update DB TO say current selected map is this map. So if they reload then it still shows. (Or use cookies)
  return {
    type: LabelCurrentTypes.LABELCURRENT_SET_LABEL,
    payload: label
  };
}
