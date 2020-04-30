import { combineReducers } from "redux";

import { libraryReducer } from "./reducers/library.reducer";

export default combineReducers({
  library: libraryReducer,
});
