import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { AppState } from "store";
import RestfulAPIConsumer from "services/api/RestfulAPIConsumer";

import { ISeed, ICreateSeed } from "models";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

const seedConsumer = new RestfulAPIConsumer<ISeed, ICreateSeed>(
  `/tradingmap/$temp/label/$temp/seed`
);
