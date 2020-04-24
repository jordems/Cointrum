import axios from "axios";

import config from "services/api/config";
import { Error500, Error400 } from "services/api/ErrorTypes";
import { IPHDSElement } from "models";
import {
  IExchanges,
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "shared-components/types";
import { addQueryParametersToURL } from "services/tools/URLParamaterTools";

export default class PHDSAPIConsumer {
  public fetchCandles(
    exchange: IExchanges,
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    start?: number,
    end?: number
  ): Promise<IPHDSElement[]> {
    const path = addQueryParametersToURL(
      config.url + `/phds/${exchange}/candles`,
      {
        basecurrency,
        altcurrency,
        interval,
        start,
        end,
      }
    );
    console.log(path);

    return new Promise((resolve, reject) => {
      axios
        .get(path)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          const { response } = err;

          if (response && response.status === 400) {
            reject(Error400(response.data));
          } else {
            reject(Error500);
          }
        });
    });
  }
}
