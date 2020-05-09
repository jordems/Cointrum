import { combineReducers } from "redux";

import { toolsReducer } from "./reducers/tools.reducer";

export default combineReducers({
  tools: toolsReducer,
});
