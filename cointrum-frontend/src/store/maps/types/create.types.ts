import {
  IAltCurrencies,
  IBaseCurrencies,
  IExchanges
} from "shared-components/types";
import { IError } from "services/api/ErrorTypes";
import { ITradingMap } from "models";

export interface State {
  form: {
    name: string;
    desc: string;
    exchange: IExchanges;
    basecurrency: IBaseCurrencies;
    altcurrency: IAltCurrencies;
  };
  dialogOpen: boolean;
  editing?: string; // TradingMapID
  error?: IError;
}

export const MAPCREATE_UPDATE = "MAPCREATE_UPDATE";

export const MAPCREATE_UPDATE_NAME = "MAPCREATE_UPDATE_NAME";
export const MAPCREATE_UPDATE_DESC = "MAPCREATE_UPDATE_DESC";
export const MAPCREATE_UPDATE_EXCHANGE = "MAPCREATE_UPDATE_EXCHANGE";
export const MAPCREATE_UPDATE_BASECURRENCY = "MAPCREATE_UPDATE_BASECURRENCY";
export const MAPCREATE_UPDATE_ALTCURRENCY = "MAPCREATE_UPDATE_ALTCURRENCY";

export const MAPCREATE_RESET_FORM = "MAPCREATE_RESET_FORM";

export const MAPCREATE_CREATION_FAILED = "MAPCREATE_CREATION_FAIL";

export const MAPCREATE_SET_DIALOG = "MAPCREATE_SET_DIALOG";

interface MapUpdateFieldName {
  type: typeof MAPCREATE_UPDATE;
  payload: {
    field: "name";
    value: State["form"]["name"];
  };
}
interface MapUpdateFieldDesc {
  type: typeof MAPCREATE_UPDATE;
  payload: {
    field: "desc";
    value: State["form"]["desc"];
  };
}
interface MapUpdateFieldExchange {
  type: typeof MAPCREATE_UPDATE;
  payload: {
    field: "exchange";
    value: State["form"]["exchange"];
  };
}
interface MapUpdateFieldBaseCurrency {
  type: typeof MAPCREATE_UPDATE;
  payload: {
    field: "basecurrency";
    value: State["form"]["basecurrency"];
  };
}
interface MapUpdateFieldAltCurrency {
  type: typeof MAPCREATE_UPDATE;
  payload: {
    field: "altcurrency";
    value: State["form"]["altcurrency"];
  };
}
interface MapResetForm {
  type: typeof MAPCREATE_RESET_FORM;
}

interface MapCreationFailForm {
  type: typeof MAPCREATE_CREATION_FAILED;
  payload: IError;
}

interface MapSetDialog {
  type: typeof MAPCREATE_SET_DIALOG;
  payload: {
    create?: boolean;
    edit?: boolean;
    map?: ITradingMap;
  };
}

export type Actions =
  | MapUpdateFieldName
  | MapUpdateFieldDesc
  | MapUpdateFieldExchange
  | MapUpdateFieldBaseCurrency
  | MapUpdateFieldAltCurrency
  | MapResetForm
  | MapCreationFailForm
  | MapSetDialog;
