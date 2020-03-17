import { connect } from "react-redux";

import { AppState } from "store";

import {
  addMaptoLibrary,
  removeMapfromLibrary,
  fetchMapLibrary
} from "store/maps/actions/library.action";

import { openCreateMapDialog } from "store/maps/actions/create.action";

import { setCurrentMap } from "store/maps/actions/current.action";

const mapStateToProps = (state: AppState) => ({
  library: state.maps.library,
  current: state.maps.current
});

export const connector = connect(mapStateToProps, {
  addMaptoLibrary,
  removeMapfromLibrary,
  fetchMapLibrary,
  openCreateMapDialog,
  setCurrentMap
});
