import { ILabel } from "models";

export interface State {
  label: ILabel | null;
}

export const LABELCURRENT_SET_LABEL = "LABELCURRENT_SET_LABELS";
export const LABELCURRENT_CLEAR_LABEL = "LABELCURRENT_CLEAR_LABEL";

interface LabelCurrentSetLabel {
  type: typeof LABELCURRENT_SET_LABEL;
  payload: ILabel;
}
interface LabelCurrentClearLabel {
  type: typeof LABELCURRENT_CLEAR_LABEL;
}

export type Actions = LabelCurrentSetLabel | LabelCurrentClearLabel;
