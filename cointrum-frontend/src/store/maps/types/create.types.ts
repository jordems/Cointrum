import { IError } from "services/api/ErrorTypes";
import { ITradingMap, ICreateTradingMap } from "models";

export interface State {
  form: ICreateTradingMap;
  dialogOpen: boolean;
  editing?: string; // TradingMapID
  error?: IError;
}

export const MAPCREATE_UPDATE = "MAPCREATE_UPDATE";

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
interface MapUpdateFieldCycleDuration {
  type: typeof MAPCREATE_UPDATE;
  payload: {
    field: "cycleduration";
    value: State["form"]["cycleduration"];
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
  | MapUpdateFieldCycleDuration
  | MapResetForm
  | MapCreationFailForm
  | MapSetDialog;
