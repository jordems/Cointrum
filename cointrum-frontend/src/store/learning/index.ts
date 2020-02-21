import { combineReducers } from "redux";

import { testReducer } from "./reducers/test.reducer";

export default combineReducers({
  test: testReducer
});
