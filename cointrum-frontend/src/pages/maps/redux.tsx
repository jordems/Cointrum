import { connect } from "react-redux";

import { AppState } from "store";

import {
  addMaptoLibrary,
  removeMapfromLibrary,
  fetchMapLibrary
} from "store/maps/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  library: state.maps.library
});

export const connector = connect(mapStateToProps, {
  addMaptoLibrary,
  removeMapfromLibrary,
  fetchMapLibrary
});
