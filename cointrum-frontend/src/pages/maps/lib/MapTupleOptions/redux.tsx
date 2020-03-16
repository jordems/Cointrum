import { connect } from "react-redux";

import { removeMapfromLibrary } from "store/maps/actions/library.action";
import { openEditMapDialog } from "store/maps/actions/create.action";
export const connector = connect(null, {
  removeMapfromLibrary,
  openEditMapDialog
});
