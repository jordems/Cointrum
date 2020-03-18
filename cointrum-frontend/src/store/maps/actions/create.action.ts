import * as MapCreateTypes from "./../types/create.types";
import {
  IAltCurrencies,
  IBaseCurrencies,
  IExchanges,
  ICycleDurations
} from "shared-components/types";
import { ITradingMap } from "models";

export function openCreateMapDialog(): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_SET_DIALOG,
    payload: {
      create: true
    }
  };
}

export function openEditMapDialog(map: ITradingMap): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_SET_DIALOG,
    payload: {
      edit: true,
      map: map
    }
  };
}

export function closeMapDialog(): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_SET_DIALOG,
    payload: {}
  };
}

export function updateMapName(name: string): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_UPDATE,
    payload: {
      field: "name",
      value: name
    }
  };
}

export function updateMapDesc(desc: string): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_UPDATE,
    payload: {
      field: "desc",
      value: desc
    }
  };
}

export function updateMapExchange(
  exchange: IExchanges
): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_UPDATE,
    payload: {
      field: "exchange",
      value: exchange
    }
  };
}

export function updateMapBaseCurrency(
  basecurrency: IBaseCurrencies
): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_UPDATE,
    payload: {
      field: "basecurrency",
      value: basecurrency
    }
  };
}

export function updateMapAltCurrency(
  altcurrency: IAltCurrencies
): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_UPDATE,
    payload: {
      field: "altcurrency",
      value: altcurrency
    }
  };
}
export function updateMapCycleDuration(
  cycleduration: ICycleDurations
): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_UPDATE,
    payload: {
      field: "cycleduration",
      value: cycleduration
    }
  };
}

export function resetMapForm(): MapCreateTypes.Actions {
  return {
    type: MapCreateTypes.MAPCREATE_RESET_FORM
  };
}
