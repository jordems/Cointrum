import * as MapCreateTypes from "./../types/create.types";
import {
  IAltCurrencies,
  IBaseCurrencies,
  IExchanges
} from "shared-components/types";

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
