import { connect } from "react-redux";

import { AppState } from "store";

import {
  addSeedtoLabelUL,
  handleSelection,
} from "store/seeds/actions/editor.action";
import {
  fetchInitialPHDS,
  fetchPHDSRange,
} from "store/phds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  mode: state.seeds.editor.seedtool,
  currentLabel: state.labels.current.label,
  phds: state.phds.library.phdselements,
  error: state.phds.library.error,
  loading: state.phds.library.loading,
});

export const connector = connect(mapStateToProps, {
  addSeedtoLabelUL,
  handleSelection,
  fetchInitialPHDS,
  fetchPHDSRange,
});
