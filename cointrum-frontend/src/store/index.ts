import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import learninghubReducers from "./learninghub";
import mapsReducers from "./maps";
import phdsReducers from "./phds";

const rootReducer = combineReducers({
  learninghub: learninghubReducers,
  maps: mapsReducers,
  phds: phdsReducers,
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
