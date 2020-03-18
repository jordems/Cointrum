import { combineReducers } from "redux";

import { createReducer } from "./reducers/create.reducer";
import { currentReducer } from "./reducers/current.reducer";
import { editorReducer } from "./reducers/editor.reducer";
import { libraryReducer } from "./reducers/library.reducer";

export default combineReducers({
  create: createReducer,
  current: currentReducer,
  editor: editorReducer,
  library: libraryReducer
});
