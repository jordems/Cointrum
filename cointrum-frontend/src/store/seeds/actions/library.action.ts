import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { AppState } from "store";
import RestfulAPIConsumer from "services/api/RestfulAPIConsumer";

import { ISeed, ICreateSeed, ILabel } from "models";
import * as SeedLibraryTypes from "../types/library.types";

type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

const seedConsumer = new RestfulAPIConsumer<ISeed, ICreateSeed>(
  `/tradingmap/$temp/label/$temp/seed`
);

export const fetchSeedsByLabel = (
  label: ILabel
): MyThunkResult<Promise<boolean>> => (
  dispatch: (e: SeedLibraryTypes.Actions) => void,
  getState
): Promise<boolean> => {
  const currentTradingMap = getState().maps.current.map;
  if (currentTradingMap === null) {
    return Promise.reject("Current map Not Selected");
  }

  seedConsumer.setPath(
    `/tradingmap/${currentTradingMap._id}/label/${label._id}/seed`
  );

  return new Promise((resolve, reject) => {
    seedConsumer
      .fetchAllDocuments()
      .then(seeds => {
        dispatch({
          type: SeedLibraryTypes.SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_SUCCESS,
          payload: seeds
        });
        resolve();
      })
      .catch(err => {
        dispatch({
          type: SeedLibraryTypes.SEEDLIBRARY_FETCH_SEEDS_FOR_LABEL_FAIL,
          payload: err
        });
        reject();
      });
  });
};
