import { IError } from "services/api/ErrorTypes";

type IBuySell = any; // TODO: Create ICreateBuySell

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

export const BUYSELLLIBRARY_ADD_TUPLE = "BUYSELLLIBRARY_ADD_TUPLE";
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

interface BuySellLibraryAddTuple {
  type: typeof BUYSELLLIBRARY_ADD_TUPLE;
  payload: IBuySell;
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
  | BuySellLibraryAddTuple
  | BuySellLibraryEditTuple
  | BuySellLibraryRemoveTuple;
