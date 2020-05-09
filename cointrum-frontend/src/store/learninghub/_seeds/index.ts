import { combineReducers } from "redux";

import { editorReducer } from "./reducers/editor.reducer";
import { libraryReducer } from "./reducers/library.reducer";

export default combineReducers({
  editor: editorReducer,
  library: libraryReducer
});
