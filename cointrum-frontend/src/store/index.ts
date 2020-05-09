import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import labelsReducers from "./labels";
import learninghubReducers from "./learninghub";
import mapsReducers from "./maps";
import phdsReducers from "./phds";
import seedsReducers from "./seeds";

const rootReducer = combineReducers({
  labels: labelsReducers,
  learninghub: learninghubReducers,
  maps: mapsReducers,
  phds: phdsReducers,
  seeds: seedsReducers,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
