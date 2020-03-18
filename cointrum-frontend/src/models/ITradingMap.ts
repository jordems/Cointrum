import {
  IExchanges,
  IBaseCurrencies,
  ICycleDurations,
  IAltCurrencies
} from "shared-components/types";

export interface ITradingMap {
  _id: string;
  name: string;
  desc: string;
  exchange: IExchanges;
  basecurrency: IBaseCurrencies;
  altcurrency: IAltCurrencies;
  cycleduration: ICycleDurations;
  created_date: Date;
  __v: number;
}
