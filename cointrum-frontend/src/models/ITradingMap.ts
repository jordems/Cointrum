import {
  IExchanges,
  IBaseCurrencies,
  IAltCurrencies
} from "shared-components/types";

export interface ITradingMap {
  _id: string;
  name: string;
  desc: string;
  exchange: IExchanges;
  basecurrency: IBaseCurrencies;
  altcurrency: IAltCurrencies;
  created_date: Date;
  __v: number;
}
