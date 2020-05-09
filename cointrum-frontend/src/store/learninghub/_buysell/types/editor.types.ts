import { IError } from "services/api/ErrorTypes";
import { ICreateBuySell } from "models";

export interface State {
  ulbuysell: {
    [tempbuysellid: string]: ICreateBuySell;
  };
  error?: IError;
  learning: boolean;
}

export const BUYSELLEDITOR_ADD_TUPLE = "BUYSELLEDITOR_ADD_TUPLE";
export const BUYSELLEDITOR_EDIT_TUPLE = "BUYSELLEDITOR_EDIT_TUPLE";
export const BUYSELLEDITOR_REMOVE_TUPLE = "BUYSELLEDITOR_REMOVE_TUPLE";
export const BUYSELLEDITOR_CLEAR_TUPLES = "BUYSELLEDITOR_CLEAR_TUPLES";

export const BUYSELLEDITOR_LEARN_ATTEMPT = "BUYSELLEDITOR_LEARN_ATTEMPT";
export const BUYSELLEDITOR_LEARN_SUCCESS = "BUYSELLEDITOR_LEARN_SUCCESS";
export const BUYSELLEDITOR_LEARN_FAIL = "BUYSELLEDITOR_LEARN_FAIL";

interface BuySellEditorAddTuple {
  type: typeof BUYSELLEDITOR_ADD_TUPLE;
  payload: ICreateBuySell;
}
interface BuySellEditorEditTuple {
  type: typeof BUYSELLEDITOR_EDIT_TUPLE;
  payload: ICreateBuySell;
}
interface BuySellEditorRemoveTuple {
  type: typeof BUYSELLEDITOR_REMOVE_TUPLE;
  payload: ICreateBuySell;
}

interface BuySellEditorClearTuples {
  type: typeof BUYSELLEDITOR_CLEAR_TUPLES;
}

interface BuySellEditorLearnAttempt {
  type: typeof BUYSELLEDITOR_LEARN_ATTEMPT;
}
interface BuySellEditorLearnSuccess {
  type: typeof BUYSELLEDITOR_LEARN_SUCCESS;
}
interface BuySellEditorLearnFail {
  type: typeof BUYSELLEDITOR_LEARN_FAIL;
  payload: IError;
}

export type Actions =
  | BuySellEditorAddTuple
  | BuySellEditorEditTuple
  | BuySellEditorRemoveTuple
  | BuySellEditorClearTuples
  | BuySellEditorLearnAttempt
  | BuySellEditorLearnSuccess
  | BuySellEditorLearnFail;
