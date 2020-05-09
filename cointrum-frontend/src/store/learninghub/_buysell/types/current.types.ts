export type BuySellButtonStates = "BUY" | "SELL";

export interface State {
  selection: BuySellButtonStates;
}

export const BUYSELLCURRENT_SET_STATE = "BUYSELLCURRENT_SET_LABELS";

interface BuySellCurrentSetLabel {
  type: typeof BUYSELLCURRENT_SET_STATE;
  payload: BuySellButtonStates;
}

export type Actions = BuySellCurrentSetLabel;
