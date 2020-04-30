import { connect } from "react-redux";

import { AppState } from "store";

import { handleSelection } from "store/seeds/actions/editor.action";
import { fetchPHDSRange } from "store/phds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  phds: state.phds.library.phdselements,
  error: state.phds.library.error,
  loading: state.phds.library.loading,
  labels: state.labels.library.labels,
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
});

export const connector = connect(mapStateToProps, {
  handleSelection,
  fetchPHDSRange,
});
