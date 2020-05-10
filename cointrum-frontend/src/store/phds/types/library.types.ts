import { IPHDSElement } from "models";
import { IError } from "services/api/ErrorTypes";

export interface State {
  phdselements: {
    [_id: number]: IPHDSElement;
  };
  error?: IError;
  loading: boolean;
}

export const PHDSLIBRARY_FETCH_ELEMENTS_REQUEST =
  "PHDSLIBRARY_FETCH_ELEMENTS_REQUEST";
export const PHDSLIBRARY_FETCH_ELEMENTS_SUCCESS =
  "PHDSLIBRARY_FETCH_ELEMENTS_SUCCESS";
export const PHDSLIBRARY_FETCH_ELEMENTS_FAIL =
  "PHDSLIBRARY_FETCH_ELEMENTS_FAIL";

export const PHDSLIBRARY_CLEAR_ELEMENTS = "PHDSLIBRARY_CLEAR_ELEMENTS";

interface PHDSLibraryFetchElementsRequest {
  type: typeof PHDSLIBRARY_FETCH_ELEMENTS_REQUEST;
}

interface PHDSLibraryFetchElementsSuccess {
  type: typeof PHDSLIBRARY_FETCH_ELEMENTS_SUCCESS;
  payload: IPHDSElement[];
}

interface PHDSLibraryFetchElementsFail {
  type: typeof PHDSLIBRARY_FETCH_ELEMENTS_FAIL;
  payload: IError;
}

interface PHDSLibraryClearElements {
  type: typeof PHDSLIBRARY_CLEAR_ELEMENTS;
}

export type Actions =
  | PHDSLibraryFetchElementsRequest
  | PHDSLibraryFetchElementsSuccess
  | PHDSLibraryFetchElementsFail
  | PHDSLibraryClearElements;
