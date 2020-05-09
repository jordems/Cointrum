import { connect } from "react-redux";

import { AppState } from "store";

import { addSeedtoLabelUL } from "store/seeds/actions/editor.action";
import { fetchPHDSRange } from "store/phds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  currentLabel: state.labels.current.label,
  phds: state.phds.library.phdselements,
  error: state.phds.library.error,
  loading: state.phds.library.loading,
});

export const connector = connect(mapStateToProps, {
  addSeedtoLabelUL,
  fetchPHDSRange,
});
