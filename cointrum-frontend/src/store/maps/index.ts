import { combineReducers } from "redux";

import { createReducer } from "./reducers/create.reducer";
import { currentReducer } from "./reducers/current.reducer";
import { libraryReducer } from "./reducers/library.reducer";

export default combineReducers({
  create: createReducer,
  current: currentReducer,
  library: libraryReducer
});
