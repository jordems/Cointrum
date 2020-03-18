import {
  IAltCurrencies,
  IBaseCurrencies,
  ICycleDurations,
  IExchanges
} from "shared-components/types";

export interface ICreateTradingMap {
  name: string;
  desc: string;
  exchange: IExchanges;
  basecurrency: IBaseCurrencies;
  altcurrency: IAltCurrencies;
  cycleduration: ICycleDurations;
}
