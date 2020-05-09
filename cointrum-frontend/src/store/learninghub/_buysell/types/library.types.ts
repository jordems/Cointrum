import { IError } from "services/api/ErrorTypes";
import { IBuySell } from "models";

export interface State {
  buysell: {
    [tempbuysellid: string]: IBuySell;
  };
  error?: IError;
  loading: boolean;
}

export const BUYSELLLIBRARY_FETCH_TUPLES_SUCCESS =
  "BUYSELLLIBRARY_FETCH_TUPLES_SUCCESS";
export const BUYSELLLIBRARY_FETCH_TUPLES_FAIL =
  "BUYSELLLIBRARY_FETCH_TUPLES_FAIL";

export const BUYSELLLIBRARY_ADD_TUPLES = "BUYSELLLIBRARY_ADD_TUPLES";
export const BUYSELLLIBRARY_EDIT_TUPLE = "BUYSELLLIBRARY_EDIT_TUPLE";
export const BUYSELLLIBRARY_REMOVE_TUPLE = "BUYSELLLIBRARY_REMOVE_TUPLE";

interface BuySellLibraryFetchTuplesSuccess {
  type: typeof BUYSELLLIBRARY_FETCH_TUPLES_SUCCESS;
  payload: {
    [buysellid: string]: IBuySell;
  };
}

interface BuySellLibraryFetchTuplesFail {
  type: typeof BUYSELLLIBRARY_FETCH_TUPLES_FAIL;
  payload: IError;
}

interface BuySellLibraryAddTuples {
  type: typeof BUYSELLLIBRARY_ADD_TUPLES;
  payload: { [_id: string]: IBuySell };
}
interface BuySellLibraryEditTuple {
  type: typeof BUYSELLLIBRARY_EDIT_TUPLE;
  payload: IBuySell;
}
interface BuySellLibraryRemoveTuple {
  type: typeof BUYSELLLIBRARY_REMOVE_TUPLE;
  payload: IBuySell;
}

export type Actions =
  | BuySellLibraryFetchTuplesSuccess
  | BuySellLibraryFetchTuplesFail
  | BuySellLibraryAddTuples
  | BuySellLibraryEditTuple
  | BuySellLibraryRemoveTuple;
