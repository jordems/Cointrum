import { connect } from "react-redux";

import {
  updateMapName,
  updateMapDesc,
  updateMapExchange,
  updateMapBaseCurrency,
  updateMapAltCurrency,
  updateMapCycleDuration
} from "store/maps/actions/create.action";

import {
  addMaptoLibrary,
  editMapinLibrary
} from "store/maps/actions/library.action";

import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  form: state.maps.create.form,
  error: state.maps.create.error,
  editingMap: state.maps.create.editing
});

export const connector = connect(mapStateToProps, {
  updateMapName,
  updateMapDesc,
  updateMapExchange,
  updateMapBaseCurrency,
  updateMapAltCurrency,
  updateMapCycleDuration,
  addMaptoLibrary,
  editMapinLibrary
});
