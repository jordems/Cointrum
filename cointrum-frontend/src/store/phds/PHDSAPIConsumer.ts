import { IPHDSElement } from "models";
import {
  IExchanges,
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "shared-components/types";

import { API_Request } from "services/api/API_Request";

export default class PHDSAPIConsumer {
  public fetchPHDS(
    exchange: IExchanges,
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    start?: number,
    end?: number
  ): Promise<IPHDSElement[]> {
    const queryParameters = {
      basecurrency,
      altcurrency,
      interval,
      start,
      end,
    };

    return API_Request("GET", {
      path: `/phds/${exchange}`,
      params: queryParameters,
    });
  }
}
