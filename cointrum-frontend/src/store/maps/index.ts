import { combineReducers } from "redux";

import { currentReducer } from "./reducers/current.reducer";
import { libraryReducer } from "./reducers/library.reducer";

export default combineReducers({
  library: libraryReducer,
  current: currentReducer
});
