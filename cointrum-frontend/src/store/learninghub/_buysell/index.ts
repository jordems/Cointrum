import { combineReducers } from "redux";

import { currentReducer } from "./reducers/current.reducer";
import { editorReducer } from "./reducers/editor.reducer";
import { libraryReducer } from "./reducers/library.reducer";

export default combineReducers({
  current: currentReducer,
  editor: editorReducer,
  library: libraryReducer,
});
