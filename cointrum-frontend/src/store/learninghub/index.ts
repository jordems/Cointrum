import { combineReducers } from "redux";

import buysellReducer from "./_buysell";
import labelsReducer from "./_labels";
import seedsReducer from "./_seeds";
import { toolsReducer } from "./reducers/tools.reducer";

export default combineReducers({
  buysell: buysellReducer,
  labels: labelsReducer,
  seeds: seedsReducer,
  tools: toolsReducer,
});
